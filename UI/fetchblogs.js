

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
// ---------------------------------------getting blogs from firebase-----------------------------------------------

    const blogsList = document.querySelector('.flexbox-blog');
    
    const renderBlog = (doc) => {
        const div = document.createElement("div");
        div.setAttribute('class', "flexbox-blog-item")
        div.setAttribute('id', doc.id)
        const id =div.getAttribute('id')

        const image = document.createElement('img');
        image.src += doc.data().imageref;
        image.alt += doc.data().image;

        const header3 = document.createElement('h3');
        header3.textContent += doc.data().title;

        const link = document.createElement('a')
        link.setAttribute("href", `./article.html#/${id}`)
        // link.textContent = header3


        const header5 = document.createElement('h5');
        header5.textContent += doc.data().created_at;

        const p = document.createElement('p');
        p.textContent += doc.data().description.substring(0,299) + "...";
      

      div.appendChild(image)
      link.appendChild(header3)
      div.appendChild(link)
      div.appendChild(header5)
      div.appendChild(p)

      blogsList.appendChild(div)
    }

    db.collection("blogs").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        renderBlog(doc);

            console.log(doc.data());
            console.log(doc.id);

        })
    })

    