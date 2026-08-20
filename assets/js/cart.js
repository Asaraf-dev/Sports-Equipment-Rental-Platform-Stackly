/*--- Your Rental Cart ---*/
document.addEventListener("DOMContentLoaded",function(){
const spCrtCart=document.querySelector(".sp-crt-cart");
if(!spCrtCart){
return;
}
const spCrtCartItems=document.getElementById("spCrtCartItems");
const spCrtCartEmpty=document.getElementById("spCrtCartEmpty");
const spCrtCartCount=document.getElementById("spCrtCartCount");
const spCrtCartItemsTitle=document.getElementById("spCrtCartItemsTitle");
const spCrtCartSubtotal=document.getElementById("spCrtCartSubtotal");
const spCrtCartService=document.getElementById("spCrtCartService");
const spCrtCartDeposit=document.getElementById("spCrtCartDeposit");
const spCrtCartTotal=document.getElementById("spCrtCartTotal");
const spCrtCartClear=document.getElementById("spCrtCartClear");
const spCrtCartCheckout=document.getElementById("spCrtCartCheckout");
const spCrtPromoInput=document.getElementById("spCrtPromoInput");
const spCrtPromoApply=document.getElementById("spCrtPromoApply");
const spCrtPromoMessage=document.getElementById("spCrtPromoMessage");
let spCrtPromoDiscount=0;
/*--- Get Cart ---*/
function spCrtGetCart(){
try{
const cart=JSON.parse(localStorage.getItem("sportsRentalCart")||"[]");
return Array.isArray(cart)?cart:[];
}catch(error){
return [];
}
}
/*--- Save Cart ---*/
function spCrtSaveCart(cart){
localStorage.setItem("sportsRentalCart",JSON.stringify(cart));
window.dispatchEvent(new Event("storage"));
}
/*--- Render Cart ---*/
function spCrtRenderCart(){
const cart=spCrtGetCart();
if(!spCrtCartItems){
return;
}
spCrtCartItems.innerHTML="";
let itemCount=0;
let subtotal=0;
cart.forEach(function(item,index){
const quantity=Math.max(1,Number(item.quantity)||1);
const price=Math.max(0,Number(item.price)||0);
const itemTotal=price*quantity;
itemCount+=quantity;
subtotal+=itemTotal;
const itemElement=document.createElement("article");
itemElement.className="sp-crt-cart-item";
itemElement.innerHTML=`
<div class="sp-crt-cart-item-image">
<i class="bi bi-trophy-fill"></i>
</div>
<div class="sp-crt-cart-item-details">
<span class="sp-crt-cart-item-category">SPORTS EQUIPMENT</span>
<h3>${spCrtEscapeHtml(item.name||"Sports Equipment")}</h3>
<p>Play-ready equipment prepared for your next session.</p>
<div class="sp-crt-cart-item-price">
<strong>₹${price.toLocaleString("en-IN")}</strong>
<span>/ day</span>
</div>
</div>
<div class="sp-crt-cart-item-actions">
<div class="sp-crt-cart-item-total">
<span>Item Total</span>
<strong>₹${itemTotal.toLocaleString("en-IN")}</strong>
</div>
<div class="sp-crt-cart-quantity">
<button type="button" class="sp-crt-cart-quantity-minus" data-index="${index}" aria-label="Decrease quantity">
<i class="bi bi-dash"></i>
</button>
<span>${quantity}</span>
<button type="button" class="sp-crt-cart-quantity-plus" data-index="${index}" aria-label="Increase quantity">
<i class="bi bi-plus"></i>
</button>
</div>
</div>
<button type="button" class="sp-crt-cart-item-remove" data-index="${index}" aria-label="Remove ${spCrtEscapeHtml(item.name||"item")}">
<i class="bi bi-x-lg"></i>
</button>
`;
spCrtCartItems.appendChild(itemElement);
});
if(spCrtCartCount){
spCrtCartCount.textContent=itemCount;
}
if(spCrtCartItemsTitle){
spCrtCartItemsTitle.textContent=itemCount===1?"1 Equipment":"Your Equipment";
}
if(spCrtCartEmpty){
spCrtCartEmpty.classList.toggle("active",cart.length===0);
}
if(spCrtCartItems){
spCrtCartItems.style.display=cart.length===0?"none":"flex";
}
const serviceFee=cart.length>0?50:0;
const securityDeposit=cart.length>0?500*cart.length:0;
const total=Math.max(0,subtotal+serviceFee+securityDeposit-spCrtPromoDiscount);
if(spCrtCartSubtotal){
spCrtCartSubtotal.textContent="₹"+subtotal.toLocaleString("en-IN");
}
if(spCrtCartService){
spCrtCartService.textContent="₹"+serviceFee.toLocaleString("en-IN");
}
if(spCrtCartDeposit){
spCrtCartDeposit.textContent="₹"+securityDeposit.toLocaleString("en-IN");
}
if(spCrtCartTotal){
spCrtCartTotal.textContent="₹"+total.toLocaleString("en-IN");
}
spCrtBindCartActions();
}
/*--- Escape HTML ---*/
function spCrtEscapeHtml(value){
const element=document.createElement("div");
element.textContent=value;
return element.innerHTML;
}
/*--- Cart Actions ---*/
function spCrtBindCartActions(){
spCrtCartItems.querySelectorAll(".sp-crt-cart-quantity-minus").forEach(function(button){
button.addEventListener("click",function(){
const index=Number(button.dataset.index);
const cart=spCrtGetCart();
if(!cart[index]){
return;
}
cart[index].quantity=Math.max(1,(Number(cart[index].quantity)||1)-1);
spCrtSaveCart(cart);
spCrtRenderCart();
});
});
spCrtCartItems.querySelectorAll(".sp-crt-cart-quantity-plus").forEach(function(button){
button.addEventListener("click",function(){
const index=Number(button.dataset.index);
const cart=spCrtGetCart();
if(!cart[index]){
return;
}
cart[index].quantity=(Number(cart[index].quantity)||1)+1;
spCrtSaveCart(cart);
spCrtRenderCart();
});
});
spCrtCartItems.querySelectorAll(".sp-crt-cart-item-remove").forEach(function(button){
button.addEventListener("click",function(){
const index=Number(button.dataset.index);
const cart=spCrtGetCart();
if(!cart[index]){
return;
}
cart.splice(index,1);
spCrtSaveCart(cart);
spCrtRenderCart();
});
});
}
/*--- Clear Cart ---*/
if(spCrtCartClear){
spCrtCartClear.addEventListener("click",function(){
const cart=spCrtGetCart();
if(!cart.length){
return;
}
localStorage.removeItem("sportsRentalCart");
spCrtPromoDiscount=0;
if(spCrtPromoMessage){
spCrtPromoMessage.textContent="";
}
spCrtRenderCart();
});
}
/*--- Promo Code ---*/
if(spCrtPromoApply){
spCrtPromoApply.addEventListener("click",function(){
const code=spCrtPromoInput?spCrtPromoInput.value.trim().toUpperCase():"";
if(!code){
spCrtPromoDiscount=0;
spCrtPromoMessage.textContent="Enter a promo code.";
return;
}
if(code==="SPORT10"){
const cart=spCrtGetCart();
let subtotal=0;
cart.forEach(function(item){
subtotal+=(Number(item.price)||0)*(Number(item.quantity)||1);
});
spCrtPromoDiscount=Math.round(subtotal*.10);
spCrtPromoMessage.textContent="SPORT10 applied — 10% off.";
}else{
spCrtPromoDiscount=0;
spCrtPromoMessage.textContent="Invalid promo code.";
}
spCrtRenderCart();
});
}
/*--- Checkout ---*/
if(spCrtCartCheckout){
spCrtCartCheckout.addEventListener("click",function(){
const cart=spCrtGetCart();
if(!cart.length){
return;
}
window.location.href="checkout.html";
});
}
/*--- Initial Render ---*/
spCrtRenderCart();
/*--- Storage Update ---*/
window.addEventListener("storage",function(){
spCrtRenderCart();
});
});