/*--- Dashboard ---*/
function initializeDashboard(){
const dashboardLayout=document.querySelector(".sp-dash-layout");
const sidebar=document.querySelector(".sp-dash-sidebar");
const overlay=document.querySelector(".sp-dash-overlay");
const menuToggle=document.querySelector(".sp-dash-menu-toggle");
const sidebarClose=document.querySelector(".sp-dash-sidebar-close");
const logoutButton=document.querySelector(".sp-dash-logout");
if(!dashboardLayout||!sidebar){
return;
}
/*--- User Data ---*/
const userName=localStorage.getItem("sportsRentalUserName")||"Player";
const userEmail=localStorage.getItem("sportsRentalUserEmail")||"user@sportRent.com";
document.querySelectorAll(".sp-dash-topbar-email,.sp-dash-sidebar-email").forEach(function(element){
element.textContent=userEmail;
});
document.querySelectorAll(".sp-dash-user-name").forEach(function(element){
element.textContent=userName.split(" ")[0];
});
/*--- Profile Initials ---*/
function getInitials(name){
const words=name.trim().split(/\s+/).filter(Boolean);
if(words.length===0){
return"SR";
}
if(words.length===1){
return words[0].substring(0,2).toUpperCase();
}
return(words[0][0]+words[1][0]).toUpperCase();
}
document.querySelectorAll(".sp-dash-profile-initials").forEach(function(element){
element.textContent=getInitials(userName);
});
/*--- Open Sidebar ---*/
function openSidebar(){
sidebar.classList.add("active");
if(overlay){
overlay.classList.add("active");
}
document.body.classList.add("sp-dash-menu-open");
if(menuToggle){
menuToggle.setAttribute("aria-expanded","true");
}
}
/*--- Close Sidebar ---*/
function closeSidebar(){
sidebar.classList.remove("active");
if(overlay){
overlay.classList.remove("active");
}
document.body.classList.remove("sp-dash-menu-open");
if(menuToggle){
menuToggle.setAttribute("aria-expanded","false");
}
}
/*--- Menu Toggle ---*/
if(menuToggle){
menuToggle.addEventListener("click",function(){
if(sidebar.classList.contains("active")){
closeSidebar();
}else{
openSidebar();
}
});
}
/*--- Sidebar Close ---*/
if(sidebarClose){
sidebarClose.addEventListener("click",function(){
closeSidebar();
});
}
/*--- Overlay Close ---*/
if(overlay){
overlay.addEventListener("click",function(){
closeSidebar();
});
}
/*--- Navigation Close ---*/
document.querySelectorAll(".sp-dash-nav-link:not(.sp-dash-logout)").forEach(function(link){
link.addEventListener("click",function(){
if(window.innerWidth<=1050){
closeSidebar();
}
});
});
/*--- Escape Close ---*/
document.addEventListener("keydown",function(event){
if(event.key==="Escape"){
closeSidebar();
}
});
/*--- Resize Handler ---*/
window.addEventListener("resize",function(){
if(window.innerWidth>1050){
closeSidebar();
}
});


/*--- Active Navigation ---*/
const currentPage=window.location.pathname.split("/").pop()||"admin-dashboard.html";
const dashboardLinks=document.querySelectorAll(".sp-dash-sidebar-nav .sp-dash-nav-link:not(.sp-dash-logout)");
dashboardLinks.forEach(function(link){
const linkPage=link.getAttribute("href");
if(linkPage===currentPage){
dashboardLinks.forEach(function(item){
item.classList.remove("active");
});
link.classList.add("active");
}
});


/*--- Logout ---*/
if(logoutButton){
logoutButton.addEventListener("click",function(){
localStorage.removeItem("sportsRentalUserEmail");
localStorage.removeItem("sportsRentalUserRole");
window.location.href="login.html";
});
}
}
/*--- Dashboard Initialize ---*/
document.addEventListener("DOMContentLoaded",function(){
initializeDashboard();
});