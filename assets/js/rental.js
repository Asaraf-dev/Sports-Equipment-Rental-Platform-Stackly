/*--- All Rental Equipment Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const spRntEquipment = document.querySelector(".sp-rnt-equipment");
    if (!spRntEquipment) {
        return;
    }
    const spRntEquipmentGrid = document.getElementById("spRntEquipmentGrid");
    const spRntEquipmentCards = Array.from(spRntEquipment.querySelectorAll(".sp-rnt-equipment-card"));
    const spRntEquipmentSearch = document.getElementById("spRntEquipmentSearch");
    const spRntEquipmentSearchClear = document.getElementById("spRntEquipmentSearchClear");
    const spRntEquipmentSort = document.getElementById("spRntEquipmentSort");
    const spRntEquipmentResultCount = document.getElementById("spRntEquipmentResultCount");
    const spRntEquipmentEmpty = document.getElementById("spRntEquipmentEmpty");
    const spRntEquipmentReset = document.getElementById("spRntEquipmentReset");
    const spRntEquipmentEmptyReset = document.getElementById("spRntEquipmentEmptyReset");
    const spRntEquipmentFilterButtons = spRntEquipment.querySelectorAll(".sp-rnt-equipment-filter-btn");
    let spRntEquipmentCategory = "all";
    /*--- Equipment Filter ---*/
    function filterEquipment() {
        const searchValue = (spRntEquipmentSearch ? spRntEquipmentSearch.value.trim().toLowerCase() : "");
        let visibleCards = spRntEquipmentCards.filter(function (card) {
            const category = card.dataset.category || "";
            const name = (card.dataset.name || "").toLowerCase();
            const matchesCategory = spRntEquipmentCategory === "all" || category === spRntEquipmentCategory;
            const matchesSearch = !searchValue || name.includes(searchValue) || category.includes(searchValue);
            return matchesCategory && matchesSearch;
        });
        sortEquipment(visibleCards);
        spRntEquipmentCards.forEach(function (card) {
            card.classList.add("hidden");
        });
        visibleCards.forEach(function (card) {
            card.classList.remove("hidden");
            spRntEquipmentGrid.appendChild(card);
        });
        if (spRntEquipmentResultCount) {
            spRntEquipmentResultCount.textContent = visibleCards.length;
        }
        if (spRntEquipmentEmpty) {
            spRntEquipmentEmpty.classList.toggle("active", visibleCards.length === 0);
        }
        if (spRntEquipmentSearchClear) {
            spRntEquipmentSearchClear.classList.toggle("active", searchValue.length > 0);
        }
    }
    /*--- Equipment Sort ---*/
    function sortEquipment(cards) {
        const sortValue = spRntEquipmentSort ? spRntEquipmentSort.value : "featured";
        cards.sort(function (firstCard, secondCard) {
            if (sortValue === "price-low") {
                return Number(firstCard.dataset.price) - Number(secondCard.dataset.price);
            }
            if (sortValue === "price-high") {
                return Number(secondCard.dataset.price) - Number(firstCard.dataset.price);
            }
            if (sortValue === "rating") {
                return Number(secondCard.dataset.rating) - Number(firstCard.dataset.rating);
            }
            if (sortValue === "name") {
                return (firstCard.dataset.name || "").localeCompare(secondCard.dataset.name || "");
            }
            return Number(firstCard.dataset.featured) - Number(secondCard.dataset.featured);
        });
    }
    /*--- Category Filter ---*/
    spRntEquipmentFilterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            spRntEquipmentFilterButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active");
            });
            button.classList.add("active");
            spRntEquipmentCategory = button.dataset.category || "all";
            filterEquipment();
        });
    });
    /*--- Search ---*/
    if (spRntEquipmentSearch) {
        spRntEquipmentSearch.addEventListener("input", filterEquipment);
    }
    /*--- Clear Search ---*/
    if (spRntEquipmentSearchClear) {
        spRntEquipmentSearchClear.addEventListener("click", function () {
            spRntEquipmentSearch.value = "";
            filterEquipment();
            spRntEquipmentSearch.focus();
        });
    }
    /*--- Sort ---*/
    if (spRntEquipmentSort) {
        spRntEquipmentSort.addEventListener("change", filterEquipment);
    }
    /*--- Reset Filters ---*/
    function resetEquipmentFilters() {
        spRntEquipmentCategory = "all";
        if (spRntEquipmentSearch) {
            spRntEquipmentSearch.value = "";
        }
        if (spRntEquipmentSort) {
            spRntEquipmentSort.value = "featured";
        }
        spRntEquipmentFilterButtons.forEach(function (button) {
            button.classList.toggle("active", button.dataset.category === "all");
        });
        filterEquipment();
    }
    if (spRntEquipmentReset) {
        spRntEquipmentReset.addEventListener("click", resetEquipmentFilters);
    }
    if (spRntEquipmentEmptyReset) {
        spRntEquipmentEmptyReset.addEventListener("click", resetEquipmentFilters);
    }
    /*--- Wishlist ---*/
    const spRntEquipmentWishlistButtons = spRntEquipment.querySelectorAll(".sp-rnt-equipment-wishlist");
    spRntEquipmentWishlistButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("active");
        });
    });
    /*--- Add To Cart ---*/
    const spRntEquipmentCartButtons = spRntEquipment.querySelectorAll(".sp-rnt-equipment-cart");
    spRntEquipmentCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productName = button.dataset.product;
            const productPrice = Number(button.dataset.price) || 0;
            let cartItems = [];
            try {
                cartItems = JSON.parse(localStorage.getItem("sportsRentalCart") || "[]");
            } catch (error) {
                cartItems = [];
            }
            const existingItem = cartItems.find(function (item) {
                return item.name === productName;
            });
            if (existingItem) {
                existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
            } else {
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            localStorage.setItem("sportsRentalCart", JSON.stringify(cartItems));
            
            button.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Added</span>';
            window.dispatchEvent(new Event("storage"));
            setTimeout(function () {
                button.classList.remove("added");
                button.innerHTML = '<i class="bi bi-bag-plus"></i><span>Add To Cart</span>';
            }, 1800);
        });
    });
    /*--- Initial Filter ---*/
    filterEquipment();
});
/*--- All Rental Equipment Section End ---*/

/*--- How Renting Works Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const spRntHow=document.querySelector(".sp-rnt-how");
if(!spRntHow){
return;
}
const spRntHowCards=spRntHow.querySelectorAll(".sp-rnt-how-card");
const spRntHowLine=spRntHow.querySelector(".sp-rnt-how-line span");
let spRntHowActive=0;
/*--- Activate Step ---*/
function activateHowStep(index){
spRntHowActive=index;
spRntHowCards.forEach(function(card,cardIndex){
card.classList.toggle("sp-rnt-how-card-active",cardIndex===index);
});
if(spRntHowLine){
const progress=[35,55,78,100];
spRntHowLine.style.width=progress[index]+"%";
}
}
/*--- Desktop Hover ---*/
spRntHowCards.forEach(function(card,index){
card.addEventListener("mouseenter",function(){
if(window.innerWidth>767){
activateHowStep(index);
}
});
/*--- Mobile Touch ---*/
card.addEventListener("click",function(){
if(window.innerWidth<=767){
activateHowStep(index);
}
});
});
/*--- Initial Step ---*/
activateHowStep(spRntHowActive);
});
/*--- How Renting Works Section End ---*/

/*--- Simple Rental Pricing Section Start ---*/
document.addEventListener("DOMContentLoaded",function(){
const spRntPricing=document.querySelector(".sp-rnt-pricing");
if(!spRntPricing){
return;
}
const spRntPricingCards=spRntPricing.querySelectorAll(".sp-rnt-pricing-card");
spRntPricingCards.forEach(function(card){
card.addEventListener("mouseenter",function(){
spRntPricingCards.forEach(function(otherCard){
otherCard.classList.remove("sp-rnt-pricing-card-active");
});
card.classList.add("sp-rnt-pricing-card-active");
});
card.addEventListener("mouseleave",function(){
card.classList.remove("sp-rnt-pricing-card-active");
});
});
/*--- Pricing Button Scroll ---*/
const spRntPricingLinks=spRntPricing.querySelectorAll('a[href="#rental-equipment"]');
spRntPricingLinks.forEach(function(link){
link.addEventListener("click",function(event){
event.preventDefault();
const target=document.getElementById("rental-equipment");
if(target){
target.scrollIntoView({
behavior:"smooth",
block:"start"
});
}
});
});
});
/*--- Simple Rental Pricing Section End ---*/