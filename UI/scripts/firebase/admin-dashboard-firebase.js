
  const db = firebase.firestore();
//------------------------log user out
  const lgout = document.querySelector("#logout")
  lgout.addEventListener("click",() =>{
      firebase.auth().signOut().then(() => {
          alert("Successfully Loged Out")
          window.location.replace("./login.html")
      }
          
      )
  })

 
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
               console.log("Project created successful " + project.data())

               // reseting form
                text =""
                projectImage = ""
                projectDescrip =""
              
               alert("Project successful created!!! ")

           })
        })

        console.log('i\'m project form!')
        
    }else{
        alert("All field must be filled")
    }
})