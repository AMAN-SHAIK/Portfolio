let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters= word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000);




//circle skills//////////

// const circles = document.querySelectorAll('.circle');
// circles.forEach(elem=>{
//     var dots = elem.getAttribute("data-dots");
//     var marked = elem.getAttribute("data-percent");
//     var percent = Math.floor(dots*marked/100);
//     var points = "";
//     var rotate = 360 / dots;

//     for(let i=0 ; i < dots ; i++){
//         points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`
//     }
//     elem.innerHTML = points;

//     const pointsMarked = elem.querySelectorAll('.points');
//     for(let i = 0; i<percent ; i++){
//         pointsMarked[i].classList.add('marked');
//     }

// });


//=================== MIXITUP MY WORK IO===================


const workFilters = document.querySelectorAll(".work_filters span");
const workCard = document.querySelectorAll(".work_card");


const filterCards = e =>{
    document.querySelector(".active-work").classList.remove("active-work");
    e.target.classList.add("active-work");

    workCard.forEach(work_card => {
        work_card.classList.add("hide");
        if(work_card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all"){
            work_card.classList.remove("hide");
        }
    });
};

workFilters.forEach(span => span.addEventListener("click", filterCards));

//===========pop up========================================
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("work_button")) { 
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})
    function togglePortfolioPopup(){
        document.querySelector(".portfolio_popup").classList.toggle("open");
}

document.querySelector(".portfolio_popup-close").addEventListener("click", togglePortfolioPopup)

function portfolioItemDetails(portfolioItem) {

    document.querySelector(".pp_thumbnail img").src = portfolioItem.querySelector(".work_img").src; 
    document.querySelector(".portfolio_popup-subtittle span").innerHTML = portfolioItem.querySelector(".work_title").innerHTML;
    
    document.querySelector(".portfolio_popup-body").innerHTML = portfolioItem.querySelector(".portfolio_item-details").innerHTML;
}

// ------------ Input Animation-----------------

const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent =this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove("focus");
}
}
inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});




////active menu////////////////////////////////////

let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}


activeMenu();
window.addEventListener("scroll",activeMenu);


//sticky navbar///////////////////
const  header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50)
})


///toggle icon navbar////////////
let menuIcon = document.querySelector(".bx-menu");
let navlist = document.querySelector(".navbar-list");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bxs-x-square");
    navlist.classList.toggle("open");
}


window.onscroll = ()=>{
    menuIcon.classList.remove("bxs-x-square");
    navlist.classList.remove("open");
}



///// parallax///////////
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else{
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));


// Observer for skillHtml elements
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-bar");
        } else {
            entry.target.classList.remove("show-bar");
        }
    });
});

// Observing skillHtml elements
const skillHtml = document.querySelectorAll(".skill-html"); // Corrected selector
skillHtml.forEach((el) => skillObserver.observe(el));




document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll('.circle');

    // Create a new Intersection Observer instance
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const pointsMarked = entry.target.querySelectorAll('.points.marked');
                pointsMarked.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.05}s`; // Adjust delay as needed
                });
                entry.target.classList.add('animate-marked');
            } else {
                entry.target.classList.remove('animate-marked');
            }
        });
    }, { threshold: 0.5 });

    // Observe each .circle element
    circles.forEach((elem) => {
        circleObserver.observe(elem);
    });

    // Generate points for each circle
    circles.forEach(elem => {
        const dots = parseInt(elem.getAttribute('data-dots'));
        const marked = parseInt(elem.getAttribute('data-percent'));
        const rotate = 360 / dots;
        const percent = Math.floor(dots * marked / 100);

        let points = "";
        for (let i = 0; i < dots; i++) {
            if (i < percent) {
                points += `<div class="points marked" style="--i:${i}; --rot:${rotate}deg"></div>`;
            } else {
                points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
            }
        }
        elem.innerHTML = points;
    });
});


///////////////Service popup////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("service_button")) {
            const serviceItem = e.target.closest(".service-box");
            if (serviceItem) {
                toggleServicePopup();
                serviceItemDetails(serviceItem);
            }
        }
    });

    function toggleServicePopup() {
        document.querySelector(".service_popup").classList.toggle("open");
    }

    document.querySelector(".service_popup-close").addEventListener("click", toggleServicePopup);

    function serviceItemDetails(serviceItem) {
        const tittle = serviceItem.querySelector(".sTittle").textContent;
        const description = serviceItem.querySelector(".sDesc").textContent;

        document.querySelector(".service_popup-body .service-details_tittle").textContent = tittle;
        document.querySelector(".service_popup-body .service-details_description").textContent = description;
    }
});

