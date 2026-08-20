/*---
ADMIN PROFILE
---*/

function initializeAdminProfile() {

    const profileForm = document.getElementById("spAdmProfileForm");

    if (!profileForm) {
        return;
    }


    /*--- Inputs ---*/

    const nameInput =
        document.getElementById("spAdmProfileInputName");

    const phoneInput =
        document.getElementById("spAdmProfileInputPhone");

    const emailInput =
        document.getElementById("spAdmProfileInputEmail");

    const roleInput =
        document.getElementById("spAdmProfileInputRole");


    /*--- Profile Display ---*/

    const profileName =
        document.getElementById("spAdmProfileName");

    const profileEmail =
        document.getElementById("spAdmProfileEmail");

    const profilePhone =
        document.getElementById("spAdmProfilePhone");

    const profileRole =
        document.getElementById("spAdmProfileRole");

    const profileRoleInfo =
        document.getElementById("spAdmProfileRoleInfo");

    const profileEmailInfo =
        document.getElementById("spAdmProfileEmailInfo");

    const avatarText =
        document.getElementById("spAdmProfileAvatarText");


    /*--- Popup ---*/

    const popup =
        document.getElementById("spAdmProfilePopup");

    const popupClose =
        document.getElementById("spAdmProfilePopupClose");


    /*---
    GET USER DATA
    ---*/

    function getUserData() {

        return {

            name:
                localStorage.getItem("sportsRentalUserName")
                || "SportRent User",

            phone:
                localStorage.getItem("sportsRentalUserPhone")
                || "",

            email:
                localStorage.getItem("sportsRentalUserEmail")
                || "",

            role:
                localStorage.getItem("sportsRentalUserRole")
                || "admin"

        };

    }


    /*---
    GET INITIALS
    ---*/

    function getInitials(name) {

        const words =
            name
                .trim()
                .split(/\s+/)
                .filter(Boolean);

        if (!words.length) {
            return "U";
        }

        if (words.length === 1) {
            return words[0]
                .charAt(0)
                .toUpperCase();
        }

        return (
            words[0].charAt(0)
            +
            words[1].charAt(0)
        ).toUpperCase();

    }


    /*---
    FORMAT ROLE
    ---*/

    function formatRole(role) {

        if (!role) {
            return "Admin";
        }

        return (
            role.charAt(0).toUpperCase()
            +
            role.slice(1).toLowerCase()
        );

    }


    /*---
    DISPLAY USER DATA
    ---*/

    function displayProfileData() {

        const userData = getUserData();

        const formattedRole =
            formatRole(userData.role);


        /*--- Form Inputs ---*/

        if (nameInput) {
            nameInput.value = userData.name;
        }

        if (phoneInput) {
            phoneInput.value = userData.phone;
        }

        if (emailInput) {
            emailInput.value = userData.email;
        }

        if (roleInput) {
            roleInput.value = formattedRole;
        }


        /*--- Profile Card ---*/

        if (profileName) {
            profileName.textContent =
                userData.name;
        }

        if (profileEmail) {
            profileEmail.textContent =
                userData.email
                || "Email Not Available";
        }

        if (profilePhone) {
            profilePhone.textContent =
                userData.phone
                || "Not Available";
        }

        if (profileRole) {
            profileRole.textContent =
                formattedRole;
        }

        if (profileRoleInfo) {
            profileRoleInfo.textContent =
                formattedRole;
        }

        if (profileEmailInfo) {
            profileEmailInfo.textContent =
                userData.email
                || "Email Not Available";
        }


        /*--- Avatar ---*/

        if (avatarText) {
            avatarText.textContent =
                getInitials(userData.name);
        }

    }


    /*---
    NAME VALIDATION
    ---*/

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^A-Za-z ]/g,
                        ""
                    );

            }
        );

    }


    /*---
    PHONE VALIDATION
    ---*/

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

            }
        );

    }


    /*---
    SAVE PROFILE
    ---*/

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*--- Browser Validation ---*/

            if (!profileForm.checkValidity()) {

                profileForm.reportValidity();

                return;

            }


            const updatedName =
                nameInput.value.trim();

            const updatedPhone =
                phoneInput.value.trim();

            const updatedEmail =
                emailInput.value.trim();


            /*--- Phone Length Validation ---*/

            if (updatedPhone.length !== 10) {

                phoneInput.setCustomValidity(
                    "Phone number must contain exactly 10 digits."
                );

                phoneInput.reportValidity();

                phoneInput.setCustomValidity("");

                return;

            }


            /*--- Store Data ---*/

            localStorage.setItem(
                "sportsRentalUserName",
                updatedName
            );

            localStorage.setItem(
                "sportsRentalUserPhone",
                updatedPhone
            );

            localStorage.setItem(
                "sportsRentalUserEmail",
                updatedEmail
            );


            /*--- Update Profile ---*/

            displayProfileData();


            /*--- Show Popup ---*/

            if (popup) {

                popup.classList.add("active");

            }

        }
    );


    /*---
    RESET PROFILE
    ---*/

    profileForm.addEventListener(
        "reset",
        function () {

            setTimeout(function () {

                displayProfileData();

            }, 0);

        }
    );


    /*---
    CLOSE POPUP
    ---*/

    if (popupClose) {

        popupClose.addEventListener(
            "click",
            function () {

                popup.classList.remove("active");

            }
        );

    }


    /*--- Close On Outside Click ---*/

    if (popup) {

        popup.addEventListener(
            "click",
            function (event) {

                if (event.target === popup) {

                    popup.classList.remove("active");

                }

            }
        );

    }


    /*---
    INITIAL DISPLAY
    ---*/

    displayProfileData();

}


/*---
INITIALIZE
---*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdminProfile();

    }
);