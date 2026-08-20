/*--- Explore Topics Section Start ---*/
/*--- Explore Topics ---*/
document.addEventListener("DOMContentLoaded", function () {
    const categoryCards = document.querySelectorAll(".sp-blg-category-card");
    if (!categoryCards.length) {
        return;
    }
    categoryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const selectedCategory = card.getAttribute("data-category");
            categoryCards.forEach(function (item) {
                item.classList.remove("active");
            });
            card.classList.add("active");
            /*--- Store Selected Category ---*/
            sessionStorage.setItem("spBlogCategory", selectedCategory);
            /*--- Filter Latest Stories ---*/
            const blogCards = document.querySelectorAll(".sp-blg-latest-card");
            blogCards.forEach(function (blogCard) {
                const blogCategory = blogCard.getAttribute("data-category");
                if (selectedCategory === "all" || blogCategory === selectedCategory) {
                    blogCard.style.display = "";
                    setTimeout(function () {
                        blogCard.classList.add("active");
                    }, 20);
                } else {
                    blogCard.classList.remove("active");
                    blogCard.style.display = "none";
                }
            });
        });
        /*--- Restore Selected Category ---*/
        const savedCategory = sessionStorage.getItem("spBlogCategory");
        if (savedCategory) {
            categoryCards.forEach(function (card) {
                if (card.getAttribute("data-category") === savedCategory) {
                    card.click();
                }
            });
        }
    });
});
/*--- Explore Topics Section End ---*/
/*--- Latest Stories Section Start ---*/
/*--- Latest Stories ---*/
document.addEventListener("DOMContentLoaded",function(){
const latestCards=document.querySelectorAll(".sp-blg-latest-card");
const latestCount=document.getElementById("spBlgLatestCount");
const latestEmpty=document.getElementById("spBlgLatestEmpty");
const latestReset=document.getElementById("spBlgLatestReset");
const latestLoad=document.getElementById("spBlgLatestLoad");
const categoryCards=document.querySelectorAll(".sp-blg-category-card");
let visibleLimit=6;
let currentCategory=sessionStorage.getItem("spBlogCategory")||"all";
/*--- Update Stories ---*/
function updateLatestStories(category){
currentCategory=category;
let matchingCards=[];
latestCards.forEach(function(card){
const cardCategory=card.getAttribute("data-category");
if(category==="all"||cardCategory===category){
matchingCards.push(card);
}
});
latestCards.forEach(function(card){
card.style.display="none";
card.classList.remove("active");
});
matchingCards.slice(0,visibleLimit).forEach(function(card,index){
card.style.display="flex";
setTimeout(function(){
card.classList.add("active");
},index*40);
});
if(latestCount){
latestCount.textContent=matchingCards.length;
}
if(latestEmpty){
latestEmpty.classList.toggle("active",matchingCards.length===0);
}
if(latestLoad){
if(matchingCards.length>visibleLimit){
latestLoad.parentElement.style.display="flex";
}else{
latestLoad.parentElement.style.display="none";
}
}
}
/*--- Category Filter ---*/
categoryCards.forEach(function(card){
card.addEventListener("click",function(){
const category=card.getAttribute("data-category");
categoryCards.forEach(function(item){
item.classList.remove("active");
});
card.classList.add("active");
sessionStorage.setItem("spBlogCategory",category);
visibleLimit=6;
updateLatestStories(category);
const latestSection=document.querySelector(".sp-blg-latest");
if(latestSection&&window.innerWidth<=767){
setTimeout(function(){
latestSection.scrollIntoView({
behavior:"smooth",
block:"start"
});
},150);
}
});
});
/*--- Reset Filter ---*/
if(latestReset){
latestReset.addEventListener("click",function(){
visibleLimit=6;
sessionStorage.setItem("spBlogCategory","all");
categoryCards.forEach(function(card){
card.classList.toggle("active",card.getAttribute("data-category")==="all");
});
updateLatestStories("all");
});
}
/*--- Load More ---*/
if(latestLoad){
latestLoad.addEventListener("click",function(){
visibleLimit+=3;
updateLatestStories(currentCategory);
});
}
/*--- Restore Category ---*/
categoryCards.forEach(function(card){
card.classList.toggle("active",card.getAttribute("data-category")===currentCategory);
});
updateLatestStories(currentCategory);
});
/*--- Latest Stories Section End ---*/