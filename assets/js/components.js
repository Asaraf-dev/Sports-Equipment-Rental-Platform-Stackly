//--- Components ---
document.addEventListener("DOMContentLoaded",async function(){
const csNavbarContainer=document.getElementById("navbar");
const csFooterContainer=document.getElementById("footer");
//--- Load Navbar ---
if(csNavbarContainer){
try{
const csNavbarResponse=await fetch("assets/components/navbar.html");
if(!csNavbarResponse.ok){
throw new Error("Navbar component could not be loaded.");
}
const csNavbarHtml=await csNavbarResponse.text();
csNavbarContainer.innerHTML=csNavbarHtml;
document.dispatchEvent(new Event("csNavbarLoaded"));
}catch(csNavbarError){
console.error("Navbar Error:",csNavbarError);
}
}
//--- Load Footer ---
if(csFooterContainer){
try{
const csFooterResponse=await fetch("assets/components/footer.html");
if(!csFooterResponse.ok){
throw new Error("Footer component could not be loaded.");
}
const csFooterHtml=await csFooterResponse.text();
csFooterContainer.innerHTML=csFooterHtml;
document.dispatchEvent(new Event("csFooterLoaded"));
}catch(csFooterError){
console.error("Footer Error:",csFooterError);
}
}
});