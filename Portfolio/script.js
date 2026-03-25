document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const togglebtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "light-mode") {
    document.body.classList.add("light-mode");
}


togglebtn.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme","light-mode");
    } else{
        localStorage.setItem("theme","dark");
    }
});






