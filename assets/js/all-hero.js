/*--- All Pages Hero ---*/
document.addEventListener("DOMContentLoaded",function(){
const spAllHero=document.querySelector(".sp-all-hero");
if(!spAllHero){
return;
}
/*--- Hero Parallax ---*/
const spAllHeroVisual=spAllHero.querySelector(".sp-all-hero-visual");
const spAllHeroCenter=spAllHero.querySelector(".sp-all-hero-center");
const spAllHeroFloats=spAllHero.querySelectorAll(".sp-all-hero-float");
if(spAllHeroVisual&&window.innerWidth>991){
spAllHeroVisual.addEventListener("mousemove",function(event){
const rect=spAllHeroVisual.getBoundingClientRect();
const x=(event.clientX-rect.left)/rect.width-.5;
const y=(event.clientY-rect.top)/rect.height-.5;
if(spAllHeroCenter){
spAllHeroCenter.style.transform="translate("+x*14+"px,"+y*14+"px)";
}
spAllHeroFloats.forEach(function(float,index){
const multiplier=(index+1)*5;
float.style.marginLeft=(x*multiplier)+"px";
float.style.marginTop=(y*multiplier)+"px";
});
});
spAllHeroVisual.addEventListener("mouseleave",function(){
if(spAllHeroCenter){
spAllHeroCenter.style.transform="";
}
spAllHeroFloats.forEach(function(float){
float.style.marginLeft="";
float.style.marginTop="";
});
});
}
/*--- Scroll Indicator ---*/
const spAllHeroScroll=spAllHero.querySelector(".sp-all-hero-scroll");
if(spAllHeroScroll){
spAllHeroScroll.addEventListener("click",function(){
window.scrollTo({
top:window.innerHeight*.75,
behavior:"smooth"
});
});
spAllHeroScroll.style.cursor="pointer";
}
/*--- Hero Entrance ---*/
spAllHero.classList.add("sp-all-hero-ready");
});