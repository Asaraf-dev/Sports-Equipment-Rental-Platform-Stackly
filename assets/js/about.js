/*--- Our Story Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const spAbtStory = document.querySelector(".sp-abt-story");
    if (!spAbtStory) {
        return;
    }
    const spAbtStoryVisual = spAbtStory.querySelector(".sp-abt-story-visual");
    const spAbtStoryImage = spAbtStory.querySelector(".sp-abt-story-image");
    if (spAbtStoryVisual && spAbtStoryImage && window.innerWidth > 991) {
        spAbtStoryVisual.addEventListener("mousemove", function (event) {
            const rect = spAbtStoryVisual.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            spAbtStoryImage.style.transform = "perspective(900px) rotateY(" + (x * 5) + "deg) rotateX(" + (-y * 5) + "deg) rotateZ(0deg) scale(1.015)";
        });
        spAbtStoryVisual.addEventListener("mouseleave", function () {
            spAbtStoryImage.style.transform = "";
        });
    }
    /*--- Story Timeline Interaction ---*/
    const spAbtStoryTimelineItems = spAbtStory.querySelectorAll(".sp-abt-story-timeline-item");
    const spAbtStoryTimelineLine = spAbtStory.querySelector(".sp-abt-story-timeline-line");
    spAbtStoryTimelineItems.forEach(function (item, index) {
        item.addEventListener("mouseenter", function () {
            spAbtStoryTimelineItems.forEach(function (otherItem) {
                otherItem.classList.remove("sp-abt-story-timeline-active");
            });
            item.classList.add("sp-abt-story-timeline-active");
            if (spAbtStoryTimelineLine) {
                spAbtStoryTimelineLine.style.width = ((index + 1) / spAbtStoryTimelineItems.length) * 100 + "%";
            }
        });
    });
});
/*--- Our Story End ---*/

/*--- What SportRent Solves Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const spAbtProblem = document.querySelector(".sp-abt-problem");
    if (!spAbtProblem) {
        return;
    }
    const spAbtProblemCards = spAbtProblem.querySelectorAll(".sp-abt-problem-card");
    spAbtProblemCards.forEach(function (card, index) {
        card.addEventListener("mouseenter", function () {
            spAbtProblemCards.forEach(function (otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove("sp-abt-problem-card-active");
                }
            });
            card.classList.add("sp-abt-problem-card-active");
        });
    });
    /*--- Problem Card Touch Interaction ---*/
    spAbtProblemCards.forEach(function (card) {
        card.addEventListener("touchstart", function () {
            card.classList.toggle("sp-abt-problem-card-active");
        }, { passive: true });
    });
});
/*--- What SportRent Solves Section End ---*/

/*--- Why Choose SportRent Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const spAbtWhy = document.querySelector(".sp-abt-why");
    if (!spAbtWhy) {
        return;
    }
    const spAbtWhyCards = spAbtWhy.querySelectorAll(".sp-abt-why-card");
    spAbtWhyCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            spAbtWhyCards.forEach(function (otherCard) {
                otherCard.classList.remove("sp-abt-why-card-active");
            });
            card.classList.add("sp-abt-why-card-active");
        });
        card.addEventListener("touchstart", function () {
            spAbtWhyCards.forEach(function (otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove("sp-abt-why-card-active");
                }
            });
            card.classList.toggle("sp-abt-why-card-active");
        }, { passive: true });
    });
    /*--- Featured Card Interaction ---*/
    const spAbtWhyFeatured = spAbtWhy.querySelector(".sp-abt-why-featured");
    const spAbtWhyFeaturedIcon = spAbtWhy.querySelector(".sp-abt-why-featured-icon");
    if (spAbtWhyFeatured && spAbtWhyFeaturedIcon && window.innerWidth > 991) {
        spAbtWhyFeatured.addEventListener("mousemove", function (event) {
            const rect = spAbtWhyFeatured.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            spAbtWhyFeaturedIcon.style.transform = "translate(" + x * 8 + "px," + y * 8 + "px) rotate(" + (x * -8) + "deg) scale(1.05)";
        });
        spAbtWhyFeatured.addEventListener("mouseleave", function () {
            spAbtWhyFeaturedIcon.style.transform = "";
        });
    }
});
/*--- Why Choose SportRent Section End ---*/

/*--- Our Team Section Start ---*/
document.addEventListener("DOMContentLoaded", function () {
    const spAbtTeam = document.querySelector(".sp-abt-team");
    if (!spAbtTeam) {
        return;
    }
    const spAbtTeamCards = spAbtTeam.querySelectorAll(".sp-abt-team-card");
    spAbtTeamCards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            spAbtTeamCards.forEach(function (otherCard) {
                otherCard.classList.remove("sp-abt-team-card-active");
            });
            card.classList.add("sp-abt-team-card-active");
        });
        card.addEventListener("touchstart", function () {
            spAbtTeamCards.forEach(function (otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove("sp-abt-team-card-active");
                }
            });
            card.classList.toggle("sp-abt-team-card-active");
        }, { passive: true });
    });
    /*--- Featured Team Interaction ---*/
    const spAbtTeamFeatured = spAbtTeam.querySelector(".sp-abt-team-featured");
    const spAbtTeamAvatar = spAbtTeam.querySelector(".sp-abt-team-featured-avatar");
    if (spAbtTeamFeatured && spAbtTeamAvatar && window.innerWidth > 991) {
        spAbtTeamFeatured.addEventListener("mousemove", function (event) {
            const rect = spAbtTeamFeatured.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            spAbtTeamAvatar.style.transform = "translate(" + x * 8 + "px," + y * 8 + "px) scale(1.05)";
        });
        spAbtTeamFeatured.addEventListener("mouseleave", function () {
            spAbtTeamAvatar.style.transform = "";
        });
    }
});
/*--- Our Team Section End ---*/