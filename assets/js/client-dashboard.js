/*--- Client Overview ---*/
function initializeClientOverview(){
    const userName=document.getElementById("spCliOverviewUserName");
    const cartItems=document.getElementById("spCliOverviewCartItems");
    const activeRentals=document.getElementById("spCliOverviewActiveRentals");
    const completedRentals=document.getElementById("spCliOverviewCompletedRentals");
    const nextReturn=document.getElementById("spCliOverviewNextReturn");
    if(!userName){
        return;
    }
    /*--- Get User Name ---*/
    const storedUserName=localStorage.getItem("sportsRentalUserName")||"Player";
    const firstName=storedUserName.trim().split(/\s+/)[0];
    userName.textContent=firstName;
    /*--- Get Cart Items ---*/
    let cart=[];
    try{
        cart=JSON.parse(localStorage.getItem("sportsRentalCart")||"[]");
    }catch(error){
        cart=[];
    }
    const cartCount=cart.reduce(function(total,item){
        return total+(Number(item.quantity)||1);
    },0);
    if(cartItems){
        cartItems.textContent=cartCount;
    }
    /*--- Default Rental Data ---*/
    if(activeRentals){
        activeRentals.textContent="0";
    }
    if(completedRentals){
        completedRentals.textContent="0";
    }
    if(nextReturn){
        nextReturn.textContent="--";
    }
}
/*--- Client Overview Initialize ---*/
document.addEventListener("DOMContentLoaded",function(){
    initializeClientOverview();
});