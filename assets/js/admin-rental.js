/*--- Admin Add Product ---*/
function initializeAdminProduct() {
    const productForm = document.getElementById("sp-adm-product-form");
    if (!productForm) {
        return;
    }
    const productName = document.getElementById("sp-adm-product-name");
    const productCategory = document.getElementById("sp-adm-product-category");
    const productBrand = document.getElementById("sp-adm-product-brand");
    const productPrice = document.getElementById("sp-adm-product-price");
    const productImage = document.getElementById("sp-adm-product-image");
    const previewName = document.getElementById("sp-adm-product-preview-name");
    const previewBrand = document.getElementById("sp-adm-product-preview-brand");
    const previewPrice = document.getElementById("sp-adm-product-preview-price");
    const previewCategory = document.querySelector(".sp-adm-product-preview-category");
    const uploadImage = document.querySelector(".sp-adm-product-preview-image");
    const cardImage = document.querySelector(".sp-adm-product-preview-card-image");
    const uploadPlaceholder = document.querySelector(".sp-adm-product-upload-placeholder");
    const previewEmpty = document.querySelector(".sp-adm-product-preview-empty");
    const featureContainer = document.querySelector(".sp-adm-product-features");
    const addFeatureButton = document.querySelector(".sp-adm-product-add-feature");
    const draftButton = document.querySelector(".sp-adm-product-draft");
    /*--- Live Product Preview ---*/
    if (productName) {
        productName.addEventListener("input", function () {
            previewName.textContent = this.value.trim() || "Your Product Name";
        });
    }
    if (productBrand) {
        productBrand.addEventListener("input", function () {
            previewBrand.textContent = this.value.trim() || "Brand name will appear here";
        });
    }
    if (productPrice) {
        productPrice.addEventListener("input", function () {
            previewPrice.textContent = this.value || "0";
        });
    }
    if (productCategory) {
        productCategory.addEventListener("change", function () {
            const selectedOption = this.options[this.selectedIndex];
            previewCategory.textContent = selectedOption.value ? selectedOption.text : "Equipment";
        });
    }
    /*--- Product Image Preview ---*/
    if (productImage) {
        productImage.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) {
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            if (uploadImage) {
                uploadImage.src = imageUrl;
                uploadImage.classList.add("active");
            }
            if (cardImage) {
                cardImage.src = imageUrl;
                cardImage.classList.add("active");
            }
            if (uploadPlaceholder) {
                uploadPlaceholder.style.display = "none";
            }
            if (previewEmpty) {
                previewEmpty.style.display = "none";
            }
        });
    }
    /*--- Add Feature ---*/
    if (addFeatureButton && featureContainer) {
        addFeatureButton.addEventListener("click", function () {
            const featureItem = document.createElement("div");
            featureItem.className = "sp-adm-product-feature-input";
            featureItem.innerHTML = '<input type="text" placeholder="Enter equipment feature"><button type="button" class="sp-adm-product-remove-feature"><i class="bi bi-x-lg"></i></button>';
            featureContainer.appendChild(featureItem);
        });
    }
    /*--- Remove Feature ---*/
    if (featureContainer) {
        featureContainer.addEventListener("click", function (event) {
            const removeButton = event.target.closest(".sp-adm-product-remove-feature");
            if (!removeButton) {
                return;
            }
            const featureItems = featureContainer.querySelectorAll(".sp-adm-product-feature-input");
            if (featureItems.length <= 1) {
                featureItems[0].querySelector("input").value = "";
                return;
            }
            removeButton.closest(".sp-adm-product-feature-input").remove();
        });
    }
    /*--- Save Product ---*/
    function saveProduct(status) {
        const features = [];
        featureContainer.querySelectorAll("input").forEach(function (input) {
            if (input.value.trim()) {
                features.push(input.value.trim());
            }
        });
        const products = JSON.parse(localStorage.getItem("sportsRentalProducts") || "[]");
        const newProduct = {
            id: Date.now(),
            name: productName.value.trim(),
            category: productCategory.value,
            brand: productBrand.value.trim(),
            condition: document.getElementById("sp-adm-product-condition").value,
            quantity: document.getElementById("sp-adm-product-quantity").value,
            price: productPrice.value,
            deposit: document.getElementById("sp-adm-product-deposit").value,
            description: document.getElementById("sp-adm-product-description").value.trim(),
            features: features,
            status: status,
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem("sportsRentalProducts", JSON.stringify(products));
    }
    /*--- Save Draft ---*/
    if (draftButton) {
        draftButton.addEventListener("click", function () {
            saveProduct("draft");
            window.location.href = "404.html";
        });
    }
    /*--- Publish Product ---*/
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!productForm.checkValidity()) {
            productForm.reportValidity();
            return;
        }
        saveProduct("published");
        window.location.href = "404.html";
    });
}
document.addEventListener("DOMContentLoaded", function () {
    initializeAdminProduct();
});