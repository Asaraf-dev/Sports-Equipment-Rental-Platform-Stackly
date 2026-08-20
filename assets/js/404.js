/*--- 404 ---*/
document.addEventListener("DOMContentLoaded",function(){
const spErrBack=document.getElementById("spErrBack");
const spErrParticles=document.getElementById("spErrParticles");
/*--- Create Particles ---*/
function spCreateErrorParticles(){
if(!spErrParticles){
return;
}
for(let i=0;i<30;i++){
const spParticle=document.createElement("span");
spParticle.className="sp-err-particle";
spParticle.style.left=Math.random()*100+"%";
spParticle.style.top=Math.random()*100+"%";
spParticle.style.width=2+Math.random()*3+"px";
spParticle.style.height=2+Math.random()*3+"px";
spParticle.style.animationDelay=Math.random()*5+"s";
spParticle.style.animationDuration=4+Math.random()*5+"s";
spErrParticles.appendChild(spParticle);
}
}
/*--- Go Back ---*/
if(spErrBack){
spErrBack.addEventListener("click",function(){
if(window.history.length>1){
window.history.back();
}else{
window.location.href="index.html";
}
});
}
/*--- Mouse Interaction ---*/
document.addEventListener("mousemove",function(event){
const x=(event.clientX/window.innerWidth-.5)*12;
const y=(event.clientY/window.innerHeight-.5)*12;
document.querySelectorAll(".sp-err-sport").forEach(function(element,index){
const strength=(index+1)*.7;
element.style.transform="translate("+x*strength+"px,"+y*strength+"px)";
});
});
/*--- Initialize ---*/
spCreateErrorParticles();
});