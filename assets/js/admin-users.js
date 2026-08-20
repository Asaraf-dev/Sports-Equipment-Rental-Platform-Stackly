/*--- Admin Users ---*/
function initializeAdminUsers() {
    const searchInput = document.getElementById("sp-adm-users-search-input");
    const roleFilter = document.getElementById("sp-adm-users-role-filter");
    const statusFilter = document.getElementById("sp-adm-users-status-filter");
    const refreshButton = document.getElementById("sp-adm-users-refresh-btn");
    const tableRows = document.querySelectorAll("#sp-adm-users-table-body tr");
    const mobileCards = document.querySelectorAll(".sp-adm-users-mobile-card");
    const visibleCount = document.getElementById("sp-adm-users-visible-count");
    const addButton = document.getElementById("sp-adm-users-add-btn");
    const addModal = document.getElementById("sp-adm-users-modal");
    const deleteModal = document.getElementById("sp-adm-users-delete-modal");
    const addForm = document.getElementById("sp-adm-users-form");
    const closeButton = document.querySelector(".sp-adm-users-modal-close");
    const cancelButton = document.querySelector(".sp-adm-users-modal-cancel");
    const modalOverlay = document.querySelector(".sp-adm-users-modal-overlay");
    const deleteOverlay = document.querySelector(".sp-adm-users-delete-overlay");
    const deleteCancel = document.querySelector(".sp-adm-users-delete-cancel");
    const deleteConfirm = document.querySelector(".sp-adm-users-delete-confirm");
    let selectedUser = null;
    /*--- Filter Users ---*/
    function filterUsers() {
        const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const roleValue = roleFilter ? roleFilter.value : "all";
        const statusValue = statusFilter ? statusFilter.value : "all";
        let count = 0;
        tableRows.forEach(function (row) {
            const rowText = row.textContent.toLowerCase();
            const rowRole = row.getAttribute("data-role");
            const rowStatus = row.getAttribute("data-status");
            const matchesSearch = rowText.includes(searchValue);
            const matchesRole = roleValue === "all" || rowRole === roleValue;
            const matchesStatus = statusValue === "all" || rowStatus === statusValue;
            const visible = matchesSearch && matchesRole && matchesStatus;
            row.style.display = visible ? "" : "none";
            if (visible) {
                count++;
            }
        });
        mobileCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const cardRole = card.getAttribute("data-role");
            const cardStatus = card.getAttribute("data-status");
            const matchesSearch = cardText.includes(searchValue);
            const matchesRole = roleValue === "all" || cardRole === roleValue;
            const matchesStatus = statusValue === "all" || cardStatus === statusValue;
            const visible = matchesSearch && matchesRole && matchesStatus;
            card.style.display = visible ? "" : "none";
        });
        if (visibleCount) {
            visibleCount.textContent = count;
        }
    }
    if (searchInput) {
        searchInput.addEventListener("input", filterUsers);
    }
    if (roleFilter) {
        roleFilter.addEventListener("change", filterUsers);
    }
    if (statusFilter) {
        statusFilter.addEventListener("change", filterUsers);
    }
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            if (searchInput) {
                searchInput.value = "";
            }
            if (roleFilter) {
                roleFilter.value = "all";
            }
            if (statusFilter) {
                statusFilter.value = "all";
            }
            filterUsers();
        });
    }
    /*--- Add User Modal ---*/
    function openAddModal() {
        if (addModal) {
            addModal.classList.add("active");
            document.body.classList.add("sp-adm-users-modal-open");
        }
    }
    function closeAddModal() {
        if (addModal) {
            addModal.classList.remove("active");
            document.body.classList.remove("sp-adm-users-modal-open");
        }
    }
    if (addButton) {
        addButton.addEventListener("click", openAddModal);
    }
    if (closeButton) {
        closeButton.addEventListener("click", closeAddModal);
    }
    if (cancelButton) {
        cancelButton.addEventListener("click", closeAddModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeAddModal);
    }
    /*--- Phone Number Validation ---*/
    const phoneInput = document.getElementById("sp-adm-users-phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 10);
        });
    }
    /*--- Add User Form ---*/
    if (addForm) {
        addForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!addForm.checkValidity()) {
                addForm.reportValidity();
                return;
            }
            const name = document.getElementById("sp-adm-users-name").value.trim();
            const email = document.getElementById("sp-adm-users-email").value.trim();
            const phone = document.getElementById("sp-adm-users-phone").value.trim();
            const role = document.getElementById("sp-adm-users-role").value;
            const users = JSON.parse(localStorage.getItem("sportsRentalUsers") || "[]");
            users.push({
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                role: role,
                status: "active",
                createdAt: new Date().toISOString()
            });
            localStorage.setItem("sportsRentalUsers", JSON.stringify(users));
            addForm.reset();
            closeAddModal();
        });
    }
    /*--- Delete User ---*/
    function openDeleteModal(button) {
        selectedUser = button.closest("tr") || button.closest(".sp-adm-users-mobile-card");
        if (deleteModal) {
            deleteModal.classList.add("active");
        }
    }
    function closeDeleteModal() {
        if (deleteModal) {
            deleteModal.classList.remove("active");
        }
        selectedUser = null;
    }
    document.querySelectorAll(".sp-adm-users-delete-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            openDeleteModal(this);
        });
    });
    if (deleteCancel) {
        deleteCancel.addEventListener("click", closeDeleteModal);
    }
    if (deleteOverlay) {
        deleteOverlay.addEventListener("click", closeDeleteModal);
    }
    if (deleteConfirm) {
        deleteConfirm.addEventListener("click", function () {
            if (selectedUser) {
                selectedUser.remove();
            }
            closeDeleteModal();
            filterUsers();
        });
    }
    /*--- Escape Key ---*/
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeAddModal();
            closeDeleteModal();
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    initializeAdminUsers();
});