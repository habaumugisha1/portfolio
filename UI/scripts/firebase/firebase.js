

//<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
//<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-analytics.js"></script>


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

  
  // const firebase.firestore() = firebase.firestore();
  
  // --------------------------------------sotoring article in firebase---------------------------------------------

  const articleForm = document.querySelector('#articleForm');
  const submitBtn = document.querySelector('#btnart');


// giving access on different link
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      console.log(user.email)

      if(user.email == "habajeunes2@gmail.com"){
   //document.querySelector('.edit').style.display= "flex"
  // document.querySelector('.delete').style.display= "flex"
   document.querySelector(".nav-list ul li a#new-article").style.display="inline-block"
   document.querySelector(".nav-list ul li a#admin-dash").style.display="inline-block"
   
     
      }else{
       //document.querySelector('.edit').style.display= "none"
       //document.querySelector('.delete').style.display= "none"
       document.querySelector(".nav-list ul li a#new-article").style.display="none"
       document.querySelector(".nav-list ul li a#admin-dash").style.display="none"


      }
    }else{
     //document.querySelector('.edit').style.display= "none"
     //document.querySelector('.delete').style.display= "none"
     document.querySelector(".nav-list ul li a#new-article").style.display="none"
     document.querySelector(".nav-list ul li a#admin-dash").style.display="none"


    }
  })

  articleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(document.getElementById('name').value != '' && document.getElementById('file').files[0] != "" && document.getElementById('content').value != ''){
        // console.log('evented....')

       // get value from input field

       let title = document.getElementById('name').value;
       let image = document.getElementById('file').files[0];
       let content = document.getElementById('content').value;
       let created_at = new Date();

       // save image in storage
       const storageRef = firebase.storage().ref();
       const imageName = storageRef.child(image.name);
       const articleImage = imageName.put(image);

        articleImage.on('state_changed', (snapshot)=>{
            const progress = (snapshot.bytesTransfarred/snapshot.totalBytes)*100;

           console.log( "upload is " + progress + "%" + " image uploaded")
       }, (error) => {
          console.log(error.message)
       }, () => {
         articleImage.snapshot.ref.getDownloadURL().then( async downloadURL => {
                // article object
                  let article = {
                    title,
                    description:content,
                    imageref: downloadURL,
                    image: imageName.location.path,
                    created_at
                };
           await firebase.firestore().collection('blogs').add(article);
                 console.log(article)
                 console.log(downloadURL)
               alert(" Article successfully Uploaded");
               articleForm.reset()
               window.location.replace("./blogs.html");
          
           });
         });
        } else{
        alert("All field must be filled");
    }
  });

