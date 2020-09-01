// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCM6QhkIm9l6jGNQ3a0Oqws4R2pGb3a-nY",
    authDomain: "ami-portfolio-682e7.firebaseapp.com",
    databaseURL: "https://ami-portfolio-682e7.firebaseio.com",
    projectId: "ami-portfolio-682e7",
    storageBucket: "ami-portfolio-682e7.appspot.com",
    messagingSenderId: "5487041337",
    appId: "1:5487041337:web:d4f0dc5c68ae2324d0e6e8",
    measurementId: "G-GX7YDY8ZX4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  const db = firebase.firestore();

/// -----------------------------------------------getting a single blog-------------------------------------------------
  const blog = document.querySelector('.post');

const getBlogId = ()=> {
    let link = window.location.href;
    let linkArray = link.split('/');
    let blogId = linkArray.slice(-1).pop()
    //console.log(blogId)
    return blogId
  }

  const renderBlog = async () => {
   let id = getBlogId()

   let oneBlog = await db.collection("blogs").doc(id).get().catch((err)=> console.log(err))

   //console.log(oneBlog.data())
   firebase.auth().onAuthStateChanged(user=>{
     if(user){
       console.log(user.email)

       if(user.email == "habajeunes2@gmail.com"){
    document.querySelector('.edit').style.display= "flex"
    document.querySelector('.delete').style.display= "flex"
    document.querySelector(".nav-list ul li a#new-article").style.display="inline-block"
    document.querySelector(".nav-list ul li a#admin-dash").style.display="inline-block"
    
      
       }else{
        document.querySelector('.edit').style.display= "none"
        document.querySelector('.delete').style.display= "none"
        document.querySelector(".nav-list ul li a#new-article").style.display="none"
        document.querySelector(".nav-list ul li a#admin-dash").style.display="none"


       }
     }else{
      document.querySelector('.edit').style.display= "none"
      document.querySelector('.delete').style.display= "none"
      document.querySelector(".nav-list ul li a#new-article").style.display="none"
      document.querySelector(".nav-list ul li a#admin-dash").style.display="none"


     }
   })

   let h3 = document.createElement("h3")
      h3.textContent = oneBlog.data().title;

   let h5 = document.createElement("h5");
       h5.textContent = oneBlog.data().created_at;

   let editBtn = document.createElement("button");
       editBtn.setAttribute("class", "edit");
       editBtn.textContent = "Edit"
       editBtn.setAttribute("value", "Edit");
       editBtn.getAttribute("value");

   let deleteBtn = document.createElement("button");
       deleteBtn.setAttribute("class", "delete");
       deleteBtn.textContent = "Delete"
       deleteBtn.setAttribute("value", "Delete");
       deleteBtn.getAttribute("value");

   let image = document.createElement("img");
       image.src = oneBlog.data().imageref;
       image.alt = oneBlog.data().image;

   let p = document.createElement("p");
       p.textContent = oneBlog.data().description;

   let br =  document.createElement("br");

   let hr = document.createElement("hr");

   
   blog.appendChild(h3)
  //  blog.appendChild(h5)
   blog.appendChild(editBtn)
   blog.appendChild(deleteBtn)
   blog.appendChild(image)
   blog.appendChild(p)
   blog.appendChild(br)
   blog.appendChild(hr)
   
  //  let dat = new Date(1598787670.784000000).toLocaleDateString().split("-")
  //  console.log(dat)
  //  console.log(blog)
  //  console.log(h3.textContent)
   
  }
  
  renderBlog()
  // ---------------------------------end of create blog-----------

  //----------------------------------------create comment-----------

  const commentForm = document.querySelector('#comment-form');

  commentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    // geting input value
    //  console.log(user)
    let name = document.querySelector('#name').value;
    let comment = document.querySelector('#commet').value;
    let date = new Date()
    let blogid = getBlogId()
    
    const commt = {
      name,
      comment,
      imageurl:'',
      date,
      blogid
    }
    firebase.auth().onAuthStateChanged(user=>{
                 console.log(user)
              
          if(user){    
              if(name!= '' || comment !=''){
                db.collection('comments').add(commt).then(() => {
                // console.log(commt)
                  alert("This blog successfully commented")
                  commentForm.reset()
                })
              }else {
                alert("all field must be filled")
              };
            }else{
              window.location.replace("./login.html");
              alert("You are not loged in, Please log in with facebook or google account!")
            }
  })
  })

  //------------------------------------- getting a blog comments---------------------


  let id = getBlogId()
  const renderComment = (doc)=>{
    if(doc.data().imageurl == ""){
      imageurl = "http://www.nretnil.com/avatar/LawrenceEzekielAmos.png"
    } else {
       imageurl = doc.data().imageurl
    }

 const comDiv = document.createElement("div")
       comDiv.setAttribute("class", "comment")

  const h5 = document.createElement('h5')
    // h5.textContent = `${count} comments`

  const comImgDiv = document.createElement("div")
        comImgDiv.setAttribute("class", "image")
  const img = document.createElement("img")
        img.src = imageurl
        
  const cmtDiv = document.createElement("div")
  cmtDiv.setAttribute('class', "content")
  

  const h4 = document.createElement('h4')
  h4.textContent= `Commented by ${doc.data().name} on ${doc.data().date}`
  const pComt = document.createElement("p")
  pComt.textContent= doc.data().comment

  //blog.appendChild(h5)
  blog.appendChild(comDiv)
  comDiv.appendChild(comImgDiv)
  comImgDiv.appendChild(img)
  comDiv.appendChild(cmtDiv)
  cmtDiv.appendChild(h4)
  cmtDiv.appendChild(pComt)
  }

  db.collection("comments").where("blogid","==",id).get().then(snapshot => {
    const count =  snapshot.size
  
    //console.log(count)
    snapshot.docs.forEach(doc => {
     renderComment(doc)
      //console.log("comments  " + doc.data().name)
    });
  })