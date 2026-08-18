//--- Loader ---
const csLoader = document.getElementById("csLoader");
const csLoaderMessage = document.getElementById("csLoaderMessage");
const csLoaderParticles = document.getElementById("csLoaderParticles");
let csLoaderMessageInterval = null;
let csLoaderHideTimeout = null;
//--- Loader Messages ---
const csLoaderMessages = [
    "Establishing Secure Connection...",
    "Initializing Security Environment...",
    "Activating Threat Intelligence...",
    "Scanning Security Protocols...",
    "Securing Digital Infrastructure...",
    "Almost Ready..."
];
let csLoaderMessageIndex = 0;
//--- Show Loader ---
function csShowLoader() {
    if (!csLoader) return;
    clearTimeout(csLoaderHideTimeout);
    clearInterval(csLoaderMessageInterval);
    csLoader.classList.remove("cs-loader-hidden");
    csLoaderMessageIndex = 0;
    if (csLoaderMessage) {
        csLoaderMessage.textContent = csLoaderMessages[0];
        csLoaderMessage.style.opacity = "1";
        csLoaderMessage.style.transform = "translateY(0)";
    }
    csLoaderMessageInterval = setInterval(() => {
        csLoaderMessageIndex++;
        if (csLoaderMessageIndex >= csLoaderMessages.length) {
            csLoaderMessageIndex = 0;
        }
        if (csLoaderMessage) {
            csLoaderMessage.style.opacity = "0";
            csLoaderMessage.style.transform = "translateY(5px)";
            setTimeout(() => {
                csLoaderMessage.textContent = csLoaderMessages[csLoaderMessageIndex];
                csLoaderMessage.style.opacity = "1";
                csLoaderMessage.style.transform = "translateY(0)";
            }, 250);
        }
    }, 1300);
}
//--- Hide Loader ---
function csHideLoader() {
    if (!csLoader) return;
    csLoaderHideTimeout = setTimeout(() => {
        csLoader.classList.add("cs-loader-hidden");
        clearInterval(csLoaderMessageInterval);
        setTimeout(() => {
            if (csLoader) {
                csLoader.style.display = "none";
            }
        }, 850);
    }, 1000);
}
//--- Create Particles ---
function csCreateLoaderParticles() {
    if (!csLoaderParticles) return;
    if (csLoaderParticles.querySelector(".cs-loader-particle")) return;
    for (let i = 0; i < 30; i++) {
        const csParticle = document.createElement("span");
        csParticle.className = "cs-loader-particle";
        csParticle.style.left = Math.random() * 100 + "%";
        csParticle.style.top = Math.random() * 100 + "%";
        const csParticleSize = 2 + Math.random() * 3;
        csParticle.style.width = csParticleSize + "px";
        csParticle.style.height = csParticleSize + "px";
        csParticle.style.animationDelay = Math.random() * 5 + "s";
        csParticle.style.animationDuration = 4 + Math.random() * 5 + "s";
        csLoaderParticles.appendChild(csParticle);
    }
}
//--- Mouse Glow ---
document.addEventListener("mousemove", function (csLoaderEvent) {
    if (!csLoader || csLoader.style.display === "none") return;
    csLoader.style.setProperty("--cs-loader-x", csLoaderEvent.clientX + "px");
    csLoader.style.setProperty("--cs-loader-y", csLoaderEvent.clientY + "px");
});
//--- Initial Page Load ---
document.addEventListener("DOMContentLoaded", function () {
    csCreateLoaderParticles();
    csShowLoader();
});
//--- Window Loaded ---
window.addEventListener("load", function () {
    csHideLoader();
});
//--- Browser Back / Forward ---
window.addEventListener("pageshow", function (csLoaderEvent) {
    if (csLoaderEvent.persisted) {
        if (csLoader) {
            csLoader.style.display = "flex";
        }
        csShowLoader();
        csHideLoader();
    }
});