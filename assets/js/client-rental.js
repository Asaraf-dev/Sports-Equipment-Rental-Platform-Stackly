/*--- Client Rental ---*/
function initializeClientRental(){
    const rentalGrid=document.getElementById("spCliRentalGrid");
    const rentalSearch=document.getElementById("spCliRentalSearch");
    const rentalFilter=document.getElementById("spCliRentalFilter");
    const rentalCount=document.getElementById("spCliRentalCount");
    const rentalEmpty=document.getElementById("spCliRentalEmpty");
    const categoryButtons=document.querySelectorAll(".sp-cli-rental-category");
    const rentalCards=document.querySelectorAll(".sp-cli-rental-card");
    if(!rentalGrid){
        return;
    }
    let currentCategory="all";
    /*--- Filter Equipment ---*/
    function filterEquipment(){
        const searchValue=rentalSearch?rentalSearch.value.toLowerCase().trim():"";
        let visibleCount=0;
        rentalCards.forEach(function(card){
            const category=card.getAttribute("data-category");
            const name=card.getAttribute("data-name").toLowerCase();
            const categoryMatch=currentCategory==="all"||category===currentCategory;
            const searchMatch=name.includes(searchValue)||category.includes(searchValue);
            if(categoryMatch&&searchMatch){
                card.style.display="";
                visibleCount++;
            }else{
                card.style.display="none";
            }
        });
        if(rentalCount){
            rentalCount.textContent=visibleCount;
        }
        if(rentalEmpty){
            rentalEmpty.style.display=visibleCount===0?"block":"none";
        }
    }
    /*--- Category Filter ---*/
    categoryButtons.forEach(function(button){
        button.addEventListener("click",function(){
            currentCategory=this.getAttribute("data-category");
            categoryButtons.forEach(function(categoryButton){
                categoryButton.classList.remove("active");
            });
            this.classList.add("active");
            if(rentalFilter){
                rentalFilter.value=currentCategory;
            }
            filterEquipment();
        });
    });
    /*--- Dropdown Filter ---*/
    if(rentalFilter){
        rentalFilter.addEventListener("change",function(){
            currentCategory=this.value;
            categoryButtons.forEach(function(categoryButton){
                categoryButton.classList.toggle("active",categoryButton.getAttribute("data-category")===currentCategory);
            });
            filterEquipment();
        });
    }
    /*--- Search Equipment ---*/
    if(rentalSearch){
        rentalSearch.addEventListener("input",function(){
            filterEquipment();
        });
    }
    /*--- Wishlist Toggle ---*/
    document.querySelectorAll(".sp-cli-rental-wishlist").forEach(function(button){
        button.addEventListener("click",function(){
            this.classList.toggle("active");
            const icon=this.querySelector("i");
            if(icon){
                icon.classList.toggle("bi-heart");
                icon.classList.toggle("bi-heart-fill");
            }
        });
    });
    /*--- Add To Cart ---*/
    document.querySelectorAll(".sp-cli-rental-add-cart").forEach(function(button){
        button.addEventListener("click",function(){
            const card=this.closest(".sp-cli-rental-card");
            const productName=this.getAttribute("data-product");
            const category=card.getAttribute("data-category");
            const image=card.querySelector("img").getAttribute("src");
            const priceText=card.querySelector(".sp-cli-rental-price strong").textContent.replace(/[^\d]/g,"");
            const price=Number(priceText);
            let cart=[];
            try{
                cart=JSON.parse(localStorage.getItem("sportsRentalCart")||"[]");
            }catch(error){
                cart=[];
            }
            const existingProduct=cart.find(function(item){
                return item.name===productName;
            });
            if(existingProduct){
                existingProduct.quantity+=1;
            }else{
                cart.push({
                    name:productName,
                    category:category,
                    image:image,
                    price:price,
                    quantity:1
                });
            }
            localStorage.setItem("sportsRentalCart",JSON.stringify(cart));
            this.classList.add("added");
            this.innerHTML='<i class="bi bi-check2"></i><span>Added</span>';
            setTimeout(function(){
                button.classList.remove("added");
                button.innerHTML='<i class="bi bi-bag-plus"></i><span>Add</span>';
            },1500);
        });
    });
    /*--- Initial Filter ---*/
    filterEquipment();
}
/*--- Client Rental Initialize ---*/
document.addEventListener("DOMContentLoaded",function(){
    initializeClientRental();
});