/*--- Client Cart ---*/
function initializeClientCart(){
    const cartItems=document.getElementById("spCliCartItems");
    const emptyCart=document.getElementById("spCliCartEmpty");
    const itemCount=document.getElementById("spCliCartItemCount");
    const subtotalElement=document.getElementById("spCliCartSubtotal");
    const depositElement=document.getElementById("spCliCartDeposit");
    const totalElement=document.getElementById("spCliCartTotal");
    const clearButton=document.getElementById("spCliCartClear");
    const checkoutButton=document.getElementById("spCliCartCheckout");
    if(!cartItems){
        return;
    }
    /*--- Format Currency ---*/
    function formatCurrency(amount){
        return "₹"+amount.toLocaleString("en-IN");
    }
    /*--- Update Cart ---*/
    function updateCart(){
        const items=cartItems.querySelectorAll(".sp-cli-cart-item");
        let subtotal=0;
        let deposit=0;
        items.forEach(function(item){
            const price=Number(item.dataset.price);
            const itemDeposit=Number(item.dataset.deposit);
            const quantityElement=item.querySelector(".sp-cli-cart-quantity-value");
            const totalElement=item.querySelector(".sp-cli-cart-item-total strong");
            const quantity=Number(quantityElement.textContent);
            const itemTotal=price*quantity;
            subtotal+=itemTotal;
            deposit+=itemDeposit*quantity;
            totalElement.textContent=formatCurrency(itemTotal);
        });
        const total=subtotal+deposit;
        if(itemCount){
            itemCount.textContent=items.length;
        }
        if(subtotalElement){
            subtotalElement.textContent=formatCurrency(subtotal);
        }
        if(depositElement){
            depositElement.textContent=formatCurrency(deposit);
        }
        if(totalElement){
            totalElement.textContent=formatCurrency(total);
        }
        if(items.length===0){
            cartItems.hidden=true;
            if(emptyCart){
                emptyCart.hidden=false;
            }
            if(clearButton){
                clearButton.style.display="none";
            }
            if(checkoutButton){
                checkoutButton.disabled=true;
            }
        }else{
            cartItems.hidden=false;
            if(emptyCart){
                emptyCart.hidden=true;
            }
            if(clearButton){
                clearButton.style.display="inline-flex";
            }
            if(checkoutButton){
                checkoutButton.disabled=false;
            }
        }
    }
    /*--- Cart Actions ---*/
    cartItems.addEventListener("click",function(event){
        const increaseButton=event.target.closest(".sp-cli-cart-increase");
        const decreaseButton=event.target.closest(".sp-cli-cart-decrease");
        const removeButton=event.target.closest(".sp-cli-cart-remove");
        if(increaseButton){
            const item=increaseButton.closest(".sp-cli-cart-item");
            const quantity=item.querySelector(".sp-cli-cart-quantity-value");
            quantity.textContent=Number(quantity.textContent)+1;
            updateCart();
        }
        if(decreaseButton){
            const item=decreaseButton.closest(".sp-cli-cart-item");
            const quantity=item.querySelector(".sp-cli-cart-quantity-value");
            const currentQuantity=Number(quantity.textContent);
            if(currentQuantity>1){
                quantity.textContent=currentQuantity-1;
                updateCart();
            }
        }
        if(removeButton){
            const item=removeButton.closest(".sp-cli-cart-item");
            item.remove();
            updateCart();
        }
    });
    /*--- Clear Cart ---*/
    if(clearButton){
        clearButton.addEventListener("click",function(){
            cartItems.innerHTML="";
            updateCart();
        });
    }
    /*--- Checkout ---*/
    if(checkoutButton){
        checkoutButton.addEventListener("click",function(){
            if(cartItems.querySelectorAll(".sp-cli-cart-item").length===0){
                return;
            }
            window.location.href="client-dashboard.html";
        });
    }
    /*--- Initial Cart Update ---*/
    updateCart();
}
/*--- Client Cart Initialize ---*/
document.addEventListener("DOMContentLoaded",function(){
    initializeClientCart();
});