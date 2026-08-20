/*--- Navbar ---*/
function initializeNavbar(){
const navbar=document.querySelector(".sp-nav-navbar");
const toggle=document.querySelector(".sp-nav-toggle");
const mobileMenu=document.querySelector(".sp-nav-mobile");
const mobileClose=document.querySelector(".sp-nav-mobile-close");
const overlay=document.querySelector(".sp-nav-overlay");
const mobileLinks=document.querySelectorAll(".sp-nav-mobile-link");
const desktopLinks=document.querySelectorAll(".sp-nav-menu-link");
const body=document.body;
if(!navbar){
return;
}
/*--- Scroll Effect ---*/
function handleNavbarScroll(){
if(window.scrollY>30){
navbar.classList.add("scrolled");
}else{
navbar.classList.remove("scrolled");
}
}
window.addEventListener("scroll",handleNavbarScroll,{passive:true});
handleNavbarScroll();
/*--- Mobile Menu ---*/
function openMobileMenu(){
if(!mobileMenu||!overlay){
return;
}
mobileMenu.classList.add("active");
overlay.classList.add("active");
body.classList.add("sp-nav-menu-open");
if(toggle){
toggle.classList.add("active");
toggle.setAttribute("aria-expanded","true");
}
}
function closeMobileMenu(){
if(!mobileMenu||!overlay){
return;
}
mobileMenu.classList.remove("active");
overlay.classList.remove("active");
body.classList.remove("sp-nav-menu-open");
if(toggle){
toggle.classList.remove("active");
toggle.setAttribute("aria-expanded","false");
}
}
if(toggle){
toggle.setAttribute("aria-expanded","false");
toggle.addEventListener("click",function(event){
event.preventDefault();
event.stopPropagation();
if(mobileMenu.classList.contains("active")){
closeMobileMenu();
}else{
openMobileMenu();
}
});
}
if(mobileClose){
mobileClose.addEventListener("click",function(event){
event.preventDefault();
closeMobileMenu();
});
}
if(overlay){
overlay.addEventListener("click",function(){
closeMobileMenu();
});
}
mobileLinks.forEach(function(link){
link.addEventListener("click",function(){
closeMobileMenu();
});
});
document.addEventListener("keydown",function(event){
if(event.key==="Escape"){
closeMobileMenu();
}
});
/*--- Active Navigation ---*/
const currentPage=window.location.pathname.split("/").pop()||"index.html";
desktopLinks.forEach(function(link){
const linkPage=link.getAttribute("href");
if(linkPage===currentPage){
desktopLinks.forEach(function(item){
item.classList.remove("active");
});
link.classList.add("active");
}
});
mobileLinks.forEach(function(link){
const linkPage=link.getAttribute("href");
if(linkPage===currentPage){
mobileLinks.forEach(function(item){
item.classList.remove("active");
});
link.classList.add("active");
}
});
/*--- Cart Navigation ---*/
const cartButtons=document.querySelectorAll(".sp-nav-cart,.sp-nav-mobile-cart");
cartButtons.forEach(function(button){
button.addEventListener("click",function(event){
event.preventDefault();
closeMobileMenu();
window.location.href="cart.html";
});
});
/*--- Cart Count ---*/
function updateCartCount(){
let cartItems=[];
try{
cartItems=JSON.parse(localStorage.getItem("sportsRentalCart")||"[]");
}catch(error){
cartItems=[];
}
const count=cartItems.reduce(function(total,item){
return total+(Number(item.quantity)||1);
},0);
document.querySelectorAll(".sp-nav-cart-count,.sp-nav-mobile-cart-count").forEach(function(element){
element.textContent=count;
});
}
updateCartCount();
window.addEventListener("storage",updateCartCount);
}
/*--- Navbar Component Loaded ---*/
document.addEventListener("spNavbarLoaded",function(){
initializeNavbar();
});
/*--- Navbar Already Available ---*/
document.addEventListener("DOMContentLoaded",function(){
if(document.querySelector(".sp-nav-navbar")){
initializeNavbar();
}
});