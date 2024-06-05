/**
 * Hämtar nödvändiga element för att animera menyn
 */
const menu = document.querySelector("a.menu");
const slideElements = document.querySelectorAll(".slide");

// Skapar en tidslinje för menyns animering
var menuAnimation = gsap.timeline({ paused: true });

// Variabel för att hålla koll på om menyn är öppen eller stängd
let expanded = false;

// Variabler för att hålla koll på fönstrets storlek.
viewPortWidth = window.innerWidth;
viewPortHeight = window.innerHeight;

// Variabel som håller koll på hur mycket menyn ska "skjutas" ner beroende på skärmens storlek
var menuOffset;

// Sätter rätt värde på variabeln ovan genom att kontrollera skärmens storlek.
if ((viewPortWidth >= 1200) & (viewPortHeight <= 650)) {
  menuOffset = viewPortHeight * 0.14;
} else {
  menuOffset = viewPortHeight * 0.07;
}

/**
 * Denna funktion kallas när menyn ska öppnas. Först återställs tidslinjen så att inget återfinns inuti den. Sedan skapas animationen för menyn och spelas upp. Skärmens storlek kontrolleras även så att det spelas en annan animation vid mobil layout.
 */
function playMenuAnimation() {
  menuAnimation.clear();

  if (viewPortWidth > 650) {
    menuAnimation
      .to("main, footer", {
        y: menuOffset,
        duration: 0.4,
        ease: "back(1)",
      })
      .fromTo(
        ".slide",
        { y: 0, opacity: 0 },
        {
          y: menuOffset,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back(1)",
        },
        "<"
      )
      .play();
  }
  if (viewPortWidth <= 650) {
    menuAnimation
      .to("main, footer", {
        x: viewPortWidth,
        duration: 0.4,
        ease: "back(1)",
      })
      .fromTo(
        "header",
        { x: 0 },
        {
          x: viewPortWidth,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back(1)",
        },
        "<"
      )
      .to("a.menu", { x: viewPortWidth * -1, ease: "back(1)" }, "<")
      .play();
    document.querySelector("html").style.overflowY = "hidden";
  }
}

/**
 * Denna funktion spelas när menyn ska stängas och spelar då upp tidslinjen baklänges.
 */
function reverseMenuAnimation() {
  menuAnimation.reverse();
  document.querySelector("html").style.overflowY = "visible";
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

// Uppdaterar värdet på variabeln "viewPortHeight" när användaren justerar fönstrets storlek
window.addEventListener("resize", function (e) {
  viewPortHeight = window.innerHeight;
});

// Liten animering på texten som återfinns på bannern.
gsap.fromTo(
  ".abc, .club",
  { opacity: 0, y: -100 },
  { opacity: 1, stagger: 0.2, duration: 5, ease: "elastic.out", y: 0 }
);
