/*--- Footer ---*/
function initializeFooter(){
/*--- Current Year ---*/
const yearElement=document.getElementById("sp-ftr-year");
if(yearElement){
yearElement.textContent=new Date().getFullYear();
}
/*--- Back To Top ---*/
const topButton=document.querySelector(".sp-ftr-top-btn");
if(topButton){
topButton.addEventListener("click",function(event){
event.preventDefault();
window.scrollTo({
top:0,
left:0,
behavior:"smooth"
});
});
}
/*--- Mobile Footer Accordion ---*/
const footerColumns=document.querySelectorAll(".sp-ftr-column");
footerColumns.forEach(function(column){
const title=column.querySelector(".sp-ftr-column-title");
if(!title){
return;
}
title.addEventListener("click",function(event){
event.preventDefault();
if(window.innerWidth>767){
return;
}
footerColumns.forEach(function(otherColumn){
if(otherColumn!==column){
otherColumn.classList.remove("open");
}
});
column.classList.toggle("open");
});
});
/*--- Newsletter ---*/
const newsletterForm=document.querySelector(".sp-ftr-newsletter-form");
const newsletterInput=document.querySelector(".sp-ftr-newsletter-input");
const toast=document.querySelector(".sp-ftr-toast");
const toastText=document.querySelector(".sp-ftr-toast-text");
if(newsletterForm&&newsletterInput){
newsletterForm.addEventListener("submit",function(event){
event.preventDefault();
if(!newsletterInput.value.trim()){
return;
}
if(!newsletterInput.checkValidity()){
newsletterInput.reportValidity();
return;
}
if(toastText){
toastText.textContent="You're on the list. Welcome to SportRent.";
}
if(toast){
toast.classList.add("active");
}
newsletterForm.reset();
setTimeout(function(){
if(toast){
toast.classList.remove("active");
}
},3500);
});
}
/*--- Footer Cart ---*/
const cartLink=document.querySelector(".sp-ftr-cart-link");
if(cartLink){
cartLink.addEventListener("click",function(event){
event.preventDefault();
window.location.href="cart.html";
});
}
/*--- Footer Links ---*/
const footerLinks=document.querySelectorAll(".sp-ftr-links a,.sp-ftr-bottom-links a");
footerLinks.forEach(function(link){
link.addEventListener("click",function(event){
if(link.getAttribute("href")==="#"){
event.preventDefault();
}
});
});
}
/*--- Footer Component Loaded ---*/
document.addEventListener("spFooterLoaded",function(){
initializeFooter();
});
/*--- Footer Already Available ---*/
document.addEventListener("DOMContentLoaded",function(){
if(document.querySelector(".sp-ftr-footer")){
initializeFooter();
}
});