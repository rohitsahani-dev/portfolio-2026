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

if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}


togglebtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    } else{
        localStorage.setItem("theme","light");
    }
});