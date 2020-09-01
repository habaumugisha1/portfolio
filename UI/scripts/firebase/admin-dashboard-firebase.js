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

  const lgout = document.querySelector("#logout")
  lgout.addEventListener("click",() =>{
      firebase.auth().signOut().then(() => {
          alert("Successfully Loged Out")
          window.location.replace("./login.html")
      }
        //   console.log("logeddddd")
          
      )
  })

  console.log("admin!!!!!-----------------------------")
const skillForm = document.querySelector("#add-skills-form");
skillForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(document.getElementById("skill-form").files[0] !="" || document.getElementById('skill').value !=""){

        console.log('i\'m skill form!')
        console.log(document.getElementById('skill').value)
    }else{
        alert("All field must be filled")
    }
})