/*--- Login Page ---*/
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("spLogForm");
    const passwordInput = document.getElementById("spLogPassword");
    const passwordToggle = document.getElementById("spLogPasswordToggle");
    const emailInput = document.getElementById("spLogEmail");
    const rememberCheckbox = document.getElementById("spLogRemember");
    /*--- Password Visibility ---*/
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener("click", function () {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            passwordToggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
            const icon = passwordToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("bi-eye", !isPassword);
                icon.classList.toggle("bi-eye-slash", isPassword);
            }
        });
    }
    /*--- Load Remembered Email ---*/
    const rememberedEmail = localStorage.getItem("sportsRentalRememberEmail");
    if (rememberedEmail && emailInput) {
        emailInput.value = rememberedEmail;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
    /*--- Login Submit ---*/
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            /*--- Browser Default Validation ---*/
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }
            const selectedRole = document.querySelector('input[name="accountType"]:checked');
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            /*--- Store Current User ---*/
            localStorage.setItem("sportsRentalUserEmail", email);
            localStorage.setItem("sportsRentalUserRole", selectedRole.value);
            /*--- Remember Email ---*/
            if (rememberCheckbox && rememberCheckbox.checked) {
                localStorage.setItem("sportsRentalRememberEmail", email);
            } else {
                localStorage.removeItem("sportsRentalRememberEmail");
            }
            /*--- Redirect Based On Role ---*/
            if (selectedRole.value === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "client-dashboard.html";
            }
        });
    }
});

/*--- Register Page ---*/
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("spRegForm");
    const nameInput = document.getElementById("spRegName");
    const phoneInput = document.getElementById("spRegPhone");
    const emailInput = document.getElementById("spRegEmail");
    const passwordInput = document.getElementById("spRegPassword");
    const confirmPasswordInput = document.getElementById("spRegConfirmPassword");
    const passwordToggles = document.querySelectorAll(".sp-reg-password-toggle");
    /*--- Name Validation ---*/
    if (nameInput) {
        nameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z ]/g, "");
        });
    }
    /*--- Phone Number Validation ---*/
    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 10);
        });
    }
    /*--- Password Visibility ---*/
    passwordToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const targetId = toggle.getAttribute("data-target");
            const targetInput = document.getElementById(targetId);
            if (!targetInput) {
                return;
            }
            const isPassword = targetInput.type === "password";
            targetInput.type = isPassword ? "text" : "password";
            toggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
            const icon = toggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("bi-eye", !isPassword);
                icon.classList.toggle("bi-eye-slash", isPassword);
            }
        });
    });
    /*--- Confirm Password Validation ---*/
    function validateConfirmPassword() {
        if (!passwordInput || !confirmPasswordInput) {
            return;
        }
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }
    if (passwordInput) {
        passwordInput.addEventListener("input", validateConfirmPassword);
    }
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    }
    /*--- Register Submit ---*/
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            validateConfirmPassword();
            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }
            const selectedRole = document.querySelector('input[name="accountType"]:checked');
            const fullName = nameInput.value.trim();
            const phoneNumber = phoneInput.value.trim();
            const email = emailInput.value.trim();
            /*--- Store Registered User ---*/
            localStorage.setItem("sportsRentalUserName", fullName);
            localStorage.setItem("sportsRentalUserPhone", phoneNumber);
            localStorage.setItem("sportsRentalUserEmail", email);
            if (selectedRole) {
                localStorage.setItem("sportsRentalUserRole", selectedRole.value);
            }
            /*--- Redirect To Login ---*/
            window.location.href = "login.html";
        });
    }
});