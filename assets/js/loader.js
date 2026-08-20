/*--- Loader ---*/
const spLdrLoader=document.getElementById("spLdrLoader");
const spLdrMessage=document.getElementById("spLdrMessage");
const spLdrParticles=document.getElementById("spLdrParticles");
let spLdrMessageInterval=null;
let spLdrHideTimeout=null;
/*--- Loader Messages ---*/
const spLdrMessages=[
"Preparing your game...",
"Getting the gear ready...",
"Checking the latest equipment...",
"Setting up your experience...",
"Almost ready to play..."
];
let spLdrMessageIndex=0;
/*--- Show Loader ---*/
function spShowLoader(){
if(!spLdrLoader){
return;
}
clearTimeout(spLdrHideTimeout);
clearInterval(spLdrMessageInterval);
spLdrLoader.style.display="flex";
spLdrLoader.classList.remove("sp-ldr-hidden","sp-ldr-exit");
spLdrMessageIndex=0;
if(spLdrMessage){
spLdrMessage.textContent=spLdrMessages[0];
spLdrMessage.style.opacity="1";
spLdrMessage.style.transform="translateY(0)";
}
spLdrMessageInterval=setInterval(function(){
spLdrMessageIndex++;
if(spLdrMessageIndex>=spLdrMessages.length){
spLdrMessageIndex=0;
}
if(spLdrMessage){
spLdrMessage.style.opacity="0";
spLdrMessage.style.transform="translateY(5px)";
setTimeout(function(){
if(spLdrMessage){
spLdrMessage.textContent=spLdrMessages[spLdrMessageIndex];
spLdrMessage.style.opacity="1";
spLdrMessage.style.transform="translateY(0)";
}
},250);
}
},1300);
}
/*--- Hide Loader ---*/
function spHideLoader(){
if(!spLdrLoader){
return;
}
clearTimeout(spLdrHideTimeout);
spLdrHideTimeout=setTimeout(function(){
clearInterval(spLdrMessageInterval);
spLdrLoader.classList.add("sp-ldr-exit");
setTimeout(function(){
if(spLdrLoader){
spLdrLoader.classList.add("sp-ldr-hidden");
spLdrLoader.style.display="none";
}
},750);
},700);
}
/*--- Create Particles ---*/
function spCreateLoaderParticles(){
if(!spLdrParticles){
return;
}
if(spLdrParticles.querySelector(".sp-ldr-particle")){
return;
}
for(let i=0;i<35;i++){
const spParticle=document.createElement("span");
spParticle.className="sp-ldr-particle";
spParticle.style.left=Math.random()*100+"%";
spParticle.style.top=Math.random()*100+"%";
const spParticleSize=2+Math.random()*3;
spParticle.style.width=spParticleSize+"px";
spParticle.style.height=spParticleSize+"px";
spParticle.style.animationDelay=Math.random()*5+"s";
spParticle.style.animationDuration=4+Math.random()*5+"s";
spLdrParticles.appendChild(spParticle);
}
}
/*--- Mouse Glow ---*/
document.addEventListener("mousemove",function(spLdrEvent){
if(!spLdrLoader||spLdrLoader.style.display==="none"){
return;
}
spLdrLoader.style.setProperty("--sp-ldr-x",spLdrEvent.clientX+"px");
spLdrLoader.style.setProperty("--sp-ldr-y",spLdrEvent.clientY+"px");
});
/*--- Initial Page Load ---*/
document.addEventListener("DOMContentLoaded",function(){
spCreateLoaderParticles();
spShowLoader();
});
/*--- Window Loaded ---*/
window.addEventListener("load",function(){
spHideLoader();
});
/*--- Browser Back / Forward ---*/
window.addEventListener("pageshow",function(spLdrEvent){
if(spLdrEvent.persisted){
if(spLdrLoader){
spLdrLoader.style.display="flex";
}
spShowLoader();
spHideLoader();
}
});