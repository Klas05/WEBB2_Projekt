/**
 * Hämtar nödvändiga element för att animera menyn
 */
const menu = document.querySelector("a.menu");
const slideElements = document.querySelectorAll(".slide");

// Skapar en tidslinje för menyns animering
var menuAnimation = gsap.timeline({ paused: true });

// Variabel för att hålla koll på om menyn är öppen eller stängd
let expanded = false;

/**
 * Denna funktion kallas när menyn ska öppnas. Först återställs tidslinjen så att inget återfinns inuti den. Sedan skapas animationen för menyn och spelas upp.
 */
function playMenuAnimation() {
  menuAnimation.clear();

  menuAnimation
    .to("main", { y: 80, duration: 0.4, ease: "back(1)" })
    .fromTo(
      ".slide",
      { y: 0, opacity: 0 },
      { y: 80, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back(1)" },
      "<"
    )
    .play();
}

/**
 * Denna funktion spelas när menyn ska stängas och spelar då upp tidslinjen baklänges.
 */
function reverseMenuAnimation() {
  menuAnimation.reverse();
}

/**
 * Lyssnar efter klick på meny knappen vilket sedan först förhindrar standard åtgärden för "a" taggar och sedan kollar om en meny animeringen redan spelas. Ifall den inte redan spelas så kontrolleras om menyn är öppen eller stängd, därefter spelas den korrekta animeringen, öppning eller stängning, och sedan uppdateras variabeln "expanded" för att korrespondera korrekt värde.
 */
menu.addEventListener("click", function (e) {
  e.preventDefault();

  if (menuAnimation.isActive()) {
    return;
  }

  if (!expanded) {
    playMenuAnimation();
  }
  if (expanded) {
    reverseMenuAnimation();
  }
  expanded = !expanded;
});
