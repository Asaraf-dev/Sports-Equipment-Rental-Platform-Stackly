/*--- Components ---*/
document.addEventListener("DOMContentLoaded",async function(){
const spNavbarContainer=document.getElementById("navbar");
const spFooterContainer=document.getElementById("footer");
/*--- Load Navbar ---*/
if(spNavbarContainer){
try{
const spNavbarResponse=await fetch("assets/components/navbar.html");
if(!spNavbarResponse.ok){
throw new Error("Navbar component could not be loaded.");
}
const spNavbarHtml=await spNavbarResponse.text();
spNavbarContainer.innerHTML=spNavbarHtml;
document.dispatchEvent(new Event("spNavbarLoaded"));
}catch(spNavbarError){
console.error("Navbar Error:",spNavbarError);
}
}
/*--- Load Footer ---*/
if(spFooterContainer){
try{
const spFooterResponse=await fetch("assets/components/footer.html");
if(!spFooterResponse.ok){
throw new Error("Footer component could not be loaded.");
}
const spFooterHtml=await spFooterResponse.text();
spFooterContainer.innerHTML=spFooterHtml;
document.dispatchEvent(new Event("spFooterLoaded"));
}catch(spFooterError){
console.error("Footer Error:",spFooterError);
}
}
});