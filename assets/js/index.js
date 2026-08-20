/*--- Index Hero Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const spIndHero = document.querySelector(".sp-ind-hero");
    const spIndHeroVisual = document.getElementById("spIndHeroVisual");
    const spIndHeroParticles = document.getElementById("spIndHeroParticles");
    /*--- Create Hero Particles ---*/
    function spIndHeroCreateParticles() {
        if (!spIndHeroParticles) {
            return;
        }
        if (spIndHeroParticles.children.length > 0) {
            return;
        }
        for (let i = 0; i < 35; i++) {
            const spParticle = document.createElement("span");
            spParticle.className = "sp-ind-hero-particle";
            spParticle.style.left = Math.random() * 100 + "%";
            spParticle.style.top = Math.random() * 100 + "%";
            const spParticleSize = 2 + Math.random() * 3;
            spParticle.style.width = spParticleSize + "px";
            spParticle.style.height = spParticleSize + "px";
            spParticle.style.animationDelay = Math.random() * 5 + "s";
            spParticle.style.animationDuration = 4 + Math.random() * 5 + "s";
            spIndHeroParticles.appendChild(spParticle);
        }
    }
    /*--- Hero Mouse Parallax ---*/
    function spIndHeroParallax(event) {
        if (!spIndHero || !spIndHeroVisual || window.innerWidth <= 991) {
            return;
        }
        const rect = spIndHero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        const rotateY = x * 7;
        const rotateX = y * -5;
        spIndHeroVisual.style.transform = "perspective(1200px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    }
    /*--- Hero Mouse Reset ---*/
    function spIndHeroReset() {
        if (!spIndHeroVisual) {
            return;
        }
        spIndHeroVisual.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    }
    /*--- Hero Cursor Glow ---*/
    function spIndHeroCursorGlow(event) {
        if (!spIndHero) {
            return;
        }
        spIndHero.style.setProperty("--sp-ind-hero-x", event.clientX + "px");
        spIndHero.style.setProperty("--sp-ind-hero-y", event.clientY + "px");
    }
    /*--- Hero Equipment Like ---*/
    const spIndHeroLike = document.querySelector(".sp-ind-hero-equipment-like");
    if (spIndHeroLike) {
        spIndHeroLike.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            const icon = spIndHeroLike.querySelector("i");
            if (!icon) {
                return;
            }
            const isLiked = spIndHeroLike.classList.toggle("active");
            if (isLiked) {
                icon.className = "bi bi-heart-fill";
            } else {
                icon.className = "bi bi-heart";
            }
        });
    }

    /*--- Hero Events ---*/
    if (spIndHero) {
        spIndHero.addEventListener("mousemove", spIndHeroParallax);
        spIndHero.addEventListener("mousemove", spIndHeroCursorGlow);
        spIndHero.addEventListener("mouseleave", spIndHeroReset);
    }
    /*--- Initialize ---*/
    spIndHeroCreateParticles();
});
/*--- Index Hero End ---*/

/*--- About Us Section Start ---*/
const spIndAboutVisual = document.querySelector(".sp-ind-about-visual");
if (spIndAboutVisual) {
    spIndAboutVisual.addEventListener("mousemove", function (event) {
        if (window.innerWidth <= 991) {
            return;
        }
        const rect = spIndAboutVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        const equipment = spIndAboutVisual.querySelector(".sp-ind-about-equipment");
        const floatCard = spIndAboutVisual.querySelector(".sp-ind-about-float");
        if (equipment) {
            equipment.style.transform = "translate(" + x * 12 + "px," + y * 12 + "px) rotate(" + x * 4 + "deg)";
        }
        if (floatCard) {
            floatCard.style.transform = "translate(" + x * -8 + "px," + y * -8 + "px)";
        }
    });
    spIndAboutVisual.addEventListener("mouseleave", function () {
        const equipment = spIndAboutVisual.querySelector(".sp-ind-about-equipment");
        const floatCard = spIndAboutVisual.querySelector(".sp-ind-about-float");
        if (equipment) {
            equipment.style.transform = "";
        }
        if (floatCard) {
            floatCard.style.transform = "";
        }
    });
}
/*--- About Us Section End ---*/

/*--- Quick Sports Categories Section Start ---*/
const spIndCategoriesCards=document.querySelectorAll(".sp-ind-categories-card");
spIndCategoriesCards.forEach(function(card){
card.addEventListener("mousemove",function(event){
if(window.innerWidth<=767){
return;
}
const rect=card.getBoundingClientRect();
const x=(event.clientX-rect.left)/rect.width-.5;
const y=(event.clientY-rect.top)/rect.height-.5;
const rotateX=y*-4;
const rotateY=x*5;
card.style.transform="translateY(-7px) perspective(700px) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)";
});
card.addEventListener("mouseleave",function(){
card.style.transform="";
});
});
/*--- Quick Sports Categories Section End ---*/

/*--- Featured Deals Start ---*/
/*--- Featured Deals ---*/
const spIndDealsFeatured=document.querySelector(".sp-ind-deals-featured");
if(spIndDealsFeatured){
spIndDealsFeatured.addEventListener("mousemove",function(event){
if(window.innerWidth<=767){
return;
}
const rect=spIndDealsFeatured.getBoundingClientRect();
const x=(event.clientX-rect.left)/rect.width-.5;
const y=(event.clientY-rect.top)/rect.height-.5;
const visual=spIndDealsFeatured.querySelector(".sp-ind-deals-featured-visual");
const equipment=spIndDealsFeatured.querySelector(".sp-ind-deals-equipment");
if(visual){
visual.style.transform="translate("+x*8+"px,"+y*8+"px)";
}
if(equipment){
equipment.style.transform="translate("+x*12+"px,"+y*12+"px) rotate("+x*5+"deg)";
}
});
spIndDealsFeatured.addEventListener("mouseleave",function(){
const visual=spIndDealsFeatured.querySelector(".sp-ind-deals-featured-visual");
const equipment=spIndDealsFeatured.querySelector(".sp-ind-deals-equipment");
if(visual){
visual.style.transform="";
}
if(equipment){
equipment.style.transform="";
}
});
}
/*--- Featured Deal Wishlist ---*/
const spIndDealsWishlist=document.querySelector(".sp-ind-deals-wishlist");
if(spIndDealsWishlist){
spIndDealsWishlist.addEventListener("click",function(){
const icon=spIndDealsWishlist.querySelector("i");
const active=spIndDealsWishlist.classList.toggle("active");
if(icon){
icon.className=active?"bi bi-heart-fill":"bi bi-heart";
}
});
}
/*--- Featured Deals End ---*/

/*--- Equipment Quality Interaction ---*/
const spIndQualitySteps=document.querySelectorAll(".sp-ind-quality-step");
const spIndQualityEquipment=document.querySelector(".sp-ind-quality-equipment");
const spIndQualityChecks=document.querySelectorAll(".sp-ind-quality-check");
spIndQualitySteps.forEach(function(step,index){
step.addEventListener("mouseenter",function(){
spIndQualitySteps.forEach(function(item){
item.classList.remove("sp-ind-quality-step-active");
});
step.classList.add("sp-ind-quality-step-active");
if(spIndQualityEquipment){
spIndQualityEquipment.style.transform="scale(1.06) rotate("+(index%2===0?-4:4)+"deg)";
}
spIndQualityChecks.forEach(function(check,itemIndex){
if(itemIndex<=index){
check.style.opacity="1";
check.style.transform="scale(1.12)";
}else{
check.style.opacity=".35";
check.style.transform="scale(.9)";
}
});
});
});

/*--- How We Keep Equipment Ready Start ---*/
/*--- Customer Reviews ---*/
const spIndReviewsData=[
{
number:"01",
text:"The whole rental experience was incredibly smooth. The cricket kit arrived clean, properly packed and ready to use. I didn't have to worry about buying expensive equipment for a weekend game.",
initials:"AK",
name:"Arjun Kumar",
details:"Cricket Player · Chennai"
},
{
number:"02",
text:"I rented rackets for a weekend with friends. The equipment was in excellent condition and the return process was simple. Definitely using SportRent again.",
initials:"PN",
name:"Priya Nair",
details:"Badminton Player · Chennai"
},
{
number:"03",
text:"The home workout kit was exactly what I needed. Good equipment, affordable pricing and no long-term commitment. The entire process was very convenient.",
initials:"VS",
name:"Vikram Shah",
details:"Fitness Player · Bengaluru"
}
];
const spIndReviewsFeaturedText=document.querySelector(".sp-ind-reviews-featured-text");
const spIndReviewsAvatar=document.querySelector(".sp-ind-reviews-avatar");
const spIndReviewsUserName=document.querySelector(".sp-ind-reviews-user-info strong");
const spIndReviewsUserDetails=document.querySelector(".sp-ind-reviews-user-info span");
const spIndReviewsNumber=document.querySelector(".sp-ind-reviews-featured-number");
const spIndReviewsCurrent=document.querySelector(".sp-ind-reviews-progress-current");
const spIndReviewsProgress=document.querySelector(".sp-ind-reviews-progress-line span");
const spIndReviewsPrev=document.querySelector(".sp-ind-reviews-prev");
const spIndReviewsNext=document.querySelector(".sp-ind-reviews-next");
const spIndReviewsCards=document.querySelectorAll(".sp-ind-reviews-card");
let spIndReviewsIndex=0;
function updateSpIndReviews(index){
spIndReviewsIndex=(index+spIndReviewsData.length)%spIndReviewsData.length;
const review=spIndReviewsData[spIndReviewsIndex];
if(spIndReviewsFeaturedText){
spIndReviewsFeaturedText.style.opacity="0";
setTimeout(function(){
spIndReviewsFeaturedText.textContent='"'+review.text+'"';
spIndReviewsFeaturedText.style.opacity="1";
},180);
}
if(spIndReviewsAvatar){
spIndReviewsAvatar.textContent=review.initials;
}
if(spIndReviewsUserName){
spIndReviewsUserName.textContent=review.name;
}
if(spIndReviewsUserDetails){
spIndReviewsUserDetails.textContent=review.details;
}
if(spIndReviewsNumber){
spIndReviewsNumber.textContent=review.number;
}
if(spIndReviewsCurrent){
spIndReviewsCurrent.textContent=review.number;
}
if(spIndReviewsProgress){
spIndReviewsProgress.style.width=((spIndReviewsIndex+1)/spIndReviewsData.length)*100+"%";
}
spIndReviewsCards.forEach(function(card,itemIndex){
card.classList.toggle("sp-ind-reviews-card-active",itemIndex===spIndReviewsIndex);
});
}
if(spIndReviewsFeaturedText){
spIndReviewsFeaturedText.style.transition="opacity .25s ease";
}
if(spIndReviewsPrev){
spIndReviewsPrev.addEventListener("click",function(){
updateSpIndReviews(spIndReviewsIndex-1);
});
}
if(spIndReviewsNext){
spIndReviewsNext.addEventListener("click",function(){
updateSpIndReviews(spIndReviewsIndex+1);
});
}
spIndReviewsCards.forEach(function(card,index){
card.addEventListener("click",function(){
updateSpIndReviews(index);
});
});
/*--- How We Keep Equipment Ready End ---*/