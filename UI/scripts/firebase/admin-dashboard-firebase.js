
  const db = firebase.firestore();


// ----------reading contacted message ----------------
const contact = document.querySelector(".contact")

db.collection('contact').get().then( snapshot => {
  snapshot.docs.forEach(doc => {
      let cont = `
                <div class="main-contentC">
                    <div class="logo">
                    <img src="../img//avatar.jpg" alt="img">
                    </div>
                    <div class="descriptionC">
                        <h3>${doc.data().date} by ${doc.data().name}</h3>
                        <h4>Email: ${doc.data().email}</h4>
                        <p>${doc.data().description}</p>
                    </div>
                </div>
      `;
     // console.log(cont)

      contact.innerHTML += cont
  })

})


//------------------------log user out---------------
  const lgout = document.querySelector("#logout")
  lgout.addEventListener("click",() =>{
      firebase.auth().signOut().then(() => {
          alert("Successfully Loged Out")
          window.location.replace("./login.html")
      }
          
      )
  })

 ////-----------------------create a project-----------
const projectForm = document.querySelector("#project-form");

projectForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const text = document.getElementById('project-title').value
    const projectImage = document.getElementById('project-image').files[0]
    const projectDescrip = document.getElementById('project-descript').value
    
    if(text !="" || projectImage !="" || projectDescrip !=""){
        const storageRef = firebase.storage().ref();
        const imageName = storageRef.child(projectImage.name)
        const prImg = imageName.put(projectImage)

        prImg.on('state_changed', (snapshot) => {
         const progress = (snapshot.bytesTransfarred/snapshot.totalBytes)*100;
         console.log(progress + "  uploading")
        },(error) => {
          console.log(error.message)
          alert(error.message)
        }, ()=>{
           prImg.snapshot.ref.getDownloadURL().then( async downloadURL => {
               let project = {
                   title: text,
                   project_imageUrl:downloadURL,
                   image_name:imageName.location.path,
                   description:projectDescrip
               };
               await db.collection('projects').add(project);
               //console.log("Project created successful " + project.data())

               // reseting form
               
               document.querySelector('.add-project-modal').style.display='none';
               
               alert("Project successful created!!! ")
               projectForm.reset()

           })
        })

        console.log('i\'m project form!')
        
    }else{
        alert("All field must be filled")
    }
})


// ----------------------------------------create skills--------
const skillsForm = document.getElementById("add-skills-form");

skillsForm.addEventListener('submit', (e)=>{
    const skillImg = document.getElementById("image-skills-field").files[0];
    const skillNames = document.getElementById("skill-add").value;
    e.preventDefault()
    if( skillImg !="" || skillNames != ""){

        /// saving image on firebase storage
        const storageRef = firebase.storage().ref()
        const imageName = storageRef.child(skillImg.name);
        const skillImage = imageName.put(skillImg)

        skillImage.on("state_changed", (snapshot) => {
       const progress = (snapshot.bytesTransfarred/snapshot.totalBytes)*100;
       console.log(progress + "image is uploading ...")
        }, (error) => {
            alert(error.message)
        }, ()=>{
        skillImage.snapshot.ref.getDownloadURL().then( async downloadURL =>{
            const skill ={
                skill:skillNames,
                skillUrl:downloadURL,
                skillImage:imageName.location.path
            }
            await db.collection('skills').add(skill);
            console.log(downloadURL)
            console.log(skill)
            alert(" skill successfully Uploaded");
            skillsForm.reset()
            document.querySelector('.add-skill-modal').style.display='none';
            })
        })
      
    } else{
            alert("Please fill all fields")
        }
    })
    
    // ----------------------------------reading project from firebase-------------------------
      const projectContainer = document.querySelector(".projec");
      db.collection('projects').get().then(snapshot =>{
          snapshot.docs.forEach( doc => {
              let  project=  `
                                <div class="flexbox-pro-item" id="${doc.id}">
                                    <img src="${doc.data().project_imageUrl}" alt="${doc.data().image_name}">
                                    <a href=""><h3>${doc.data().title}</h3></a>
                                    <p>${doc.data().description}</p> 
                                    <span><i class="fas fa-trash-alt" id="deletepro" onclick="deleteProject()"></i></span>
                                    <span><i class="fas fa-pen-alt" onclick="updateProject()" id="updatepro"></i></span>
                                </div>
                             `;
                             
          projectContainer.innerHTML += project;

                            
          })
      });

      ///// this for deleting project------------
    function deleteProject (){                         
            let projectId=event.target.parentNode.parentNode.id
            db.collection('projects').doc(projectId).delete()
            alert("Deleted successfully!!!")
        };
                        
 
//  ---------------------------------reading skills from firebase--------

const skillContainer = document.querySelector('.description-skill')

const renderSkill = (doc) =>{

        let skillItm = document.createElement("div")
            skillItm.setAttribute("class", "flexbox-skill-item")
            skillItm.setAttribute("id", doc.id)

        let skillImge = document.createElement("img")
            skillImge.src = doc.data().skillUrl
            skillImge.alt = doc.data().skillImage

        let pragra = document.createElement("p")
            pragra.textContent = doc.data().skill

        let span1 = document.createElement("span")

        let dIcon =document.createElement("i")
            dIcon.setAttribute("class","fas fa-trash-alt")
            dIcon.setAttribute("id", "delete-skill")
            dIcon.addEventListener('click', ()=>{
                let skillId = dIcon.parentNode.parentNode.id 
                console.log(" delete clicked!!  ")
                console.log(skillId)
                db.collection('skills').doc(skillId).delete()
                alert("Skill successfully deleted!!")
            })
        

        let span2 = document.createElement("span")

        let upIcon =document.createElement("i")
            upIcon.setAttribute("class","fas fa-pen-alt")
            upIcon.setAttribute("id", "update-skill")
            

        skillContainer.appendChild(skillItm)
        skillItm.appendChild(skillImge)
        skillItm.appendChild(pragra)
        skillItm.appendChild(span1)
        span1.appendChild(dIcon)
        skillItm.appendChild(span2)
        span2.appendChild(upIcon)

    }

db.collection('skills').get().then(snapshot => {
   snapshot.docs.forEach(doc => {
      renderSkill(doc)
    
   });

}).catch(error => console.log(error.message))

// db.collection('skills').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges()
//     changes.forEach(change => {
     
//      if(change.type == "added"){

//          renderSkill(changes.doc)
//      } else if (change.type == "removed"){
//       skillContainer.removeChild(skillItm)
//      }
     
//     });
 
//  })



// ------deleting skill from firebase----------------------





