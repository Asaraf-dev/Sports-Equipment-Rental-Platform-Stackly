/*--- Get In Touch Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const contactForm=document.getElementById("spConContactForm");
const nameInput=document.getElementById("spConName");
const phoneInput=document.getElementById("spConPhone");
const contactPopup=document.getElementById("spConContactPopup");
const popupClose=document.getElementById("spConContactPopupClose");
const popupButton=document.getElementById("spConContactPopupBtn");
/*--- Name Alphabet Only ---*/
if(nameInput){
nameInput.addEventListener("input",function(){
this.value=this.value.replace(/[^A-Za-z ]/g,"");
});
}
/*--- Phone Numbers Only ---*/
if(phoneInput){
phoneInput.addEventListener("input",function(){
this.value=this.value.replace(/\D/g,"").slice(0,10);
});
}
/*--- Open Success Popup ---*/
function openContactPopup(){
if(contactPopup){
contactPopup.classList.add("active");
document.body.classList.add("sp-con-popup-open");
}
}
/*--- Close Success Popup ---*/
function closeContactPopup(){
if(contactPopup){
contactPopup.classList.remove("active");
document.body.classList.remove("sp-con-popup-open");
}
}
/*--- Form Submit ---*/
if(contactForm){
contactForm.addEventListener("submit",function(event){
event.preventDefault();
if(!contactForm.checkValidity()){
contactForm.reportValidity();
return;
}
openContactPopup();
contactForm.reset();
});
}
/*--- Popup Close ---*/
if(popupClose){
popupClose.addEventListener("click",function(){
closeContactPopup();
});
}
if(popupButton){
popupButton.addEventListener("click",function(){
closeContactPopup();
});
}
/*--- Close On Outside Click ---*/
if(contactPopup){
contactPopup.addEventListener("click",function(event){
if(event.target===contactPopup){
closeContactPopup();
}
});
}
/*--- Close On Escape ---*/
document.addEventListener("keydown",function(event){
if(event.key==="Escape"){
closeContactPopup();
}
});
});
/*--- Get In Touch Section End ---*/

/*--- Frequently Asked Questions Section Start ---*/
function initializeContactFaq(){
const faqItems=document.querySelectorAll(".sp-con-faq-item");
faqItems.forEach(function(item){
const question=item.querySelector(".sp-con-faq-question");
if(!question){
return;
}
question.addEventListener("click",function(){
const isActive=item.classList.contains("active");
faqItems.forEach(function(otherItem){
otherItem.classList.remove("active");
const otherQuestion=otherItem.querySelector(".sp-con-faq-question");
if(otherQuestion){
otherQuestion.setAttribute("aria-expanded","false");
}
});
if(!isActive){
item.classList.add("active");
question.setAttribute("aria-expanded","true");
}
});
});
}
document.addEventListener("DOMContentLoaded",function(){
initializeContactFaq();
});
/*--- Frequently Asked Questions Section End ---*/