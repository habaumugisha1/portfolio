const linkCont = document.querySelectorAll(".navs a");
const conten = document.querySelectorAll(".content");
const navBar = document.querySelector(".menu-bar");
const nav_menu = document.querySelector(".user-profile-l");
const mobile_menu = document.querySelectorAll(".user-profile-l ul li a");
const check = document.getElementById("check")
const inputs = document.querySelectorAll('.focused');


linkCont.forEach(link=> {
    link.addEventListener('click', ()=>{
        document.querySelector(".navs li.active").classList.remove("active");
        document.querySelector(".content.active").classList.remove("active");
        const parentEl = link.parentElement;
        parentEl.classList.add("active");
        const index = [...parentEl.parentElement.children].indexOf(parentEl);
        const conte = [...conten].filter(elem =>elem.getAttribute("data-index")==index);
        conte[0].classList.add("active");
    });
});


document.getElementById("updatebtn").addEventListener('click', () => {
    document.querySelector(".update").classList.add("active");
})

navBar.addEventListener("click", () =>{
    navBar.classList.toggle("move");
    nav_menu.classList.toggle("move");

})

mobile_menu.forEach((link) => {
    link.addEventListener('click', ()=>{
        console.log(link);
      navBar.classList.toggle("move");
      nav_menu.classList.toggle("move");  
    })
})


inputs.forEach(input => {
    input.addEventListener('focus', focusFunction);
    input.addEventListener('blur', blurFunction);
});

function focusFunction(){
    let parent = this.parentNode;
    parent.classList.add('focus');
}
function blurFunction(){
    let parent = this.parentNode;
    if(this.value == ""){
        parent.classList.remove('focus');
    }
}