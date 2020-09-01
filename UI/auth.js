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


  //----------------------------Loginwith Emal----------------------

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
       e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
  //  console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password).then(creditial => {
        console.log("Login successfully" + creditial.user)
        if (email =="habajeunes2@gmail.com"){

            loginForm.reset()
           window.location.replace("./admin-dashboard.html")
        }else{
            loginForm.reset()
            window.location.replace("../index.html")
        }
    }).catch((err) => {
        alert(err.message)
    })
})


// -------------------------------Auth with facebook---------------------------
const fbAuthBtn = document.querySelector('#fbAuth');

fbAuthBtn.addEventListener('click', () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    //fbProvider.addScope("profile")
    firebase.auth().signInWithPopup(fbProvider).then((creditial)=>{

        console.log( "user signed in" + creditial.user)
    }).catch(error => alert(error.message))
})
  //--------------------------------Auth with Google---------------------------------
  
  const googleAuth = document.querySelector('#googleAuth')
  googleAuth.addEventListener('click', () =>{
      const provider = new firebase.auth.GoogleAuthProvider();
      //console.log(provider)
      firebase.auth().signInWithPopup(provider).then(()=>{

          console.log("auth ...")
      }).catch(err => alert(err.message))

  })