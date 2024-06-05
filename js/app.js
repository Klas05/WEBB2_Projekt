const menu = document.querySelector("a.menu"),
  slideElements = document.querySelectorAll(".slide");
var menuOffset,
  menuAnimation = gsap.timeline({ paused: !0 });
let expanded = !1;
function playMenuAnimation() {
  menuAnimation.clear(),
    650 < viewPortWidth &&
      menuAnimation
        .to("main, footer", { y: menuOffset, duration: 0.4, ease: "back(1)" })
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
        .play(),
    viewPortWidth <= 650 &&
      (menuAnimation
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
        .to("a.menu", { x: -1 * viewPortWidth, ease: "back(1)" }, "<")
        .play(),
      (document.querySelector("html").style.overflowY = "hidden"));
}
function reverseMenuAnimation() {
  menuAnimation.reverse(),
    (document.querySelector("html").style.overflowY = "visible");
}
(viewPortWidth = window.innerWidth),
  (viewPortHeight = window.innerHeight),
  (menuOffset =
    (1200 <= viewPortWidth) & (viewPortHeight <= 650)
      ? 0.14 * viewPortHeight
      : 0.07 * viewPortHeight),
  menu.addEventListener("click", function (e) {
    e.preventDefault(),
      menuAnimation.isActive() ||
        (expanded || playMenuAnimation(),
        expanded && reverseMenuAnimation(),
        (expanded = !expanded));
  }),
  window.addEventListener("resize", function (e) {
    viewPortHeight = window.innerHeight;
  }),
  gsap.fromTo(
    ".abc, .club",
    { opacity: 0, y: -100 },
    { opacity: 1, stagger: 0.2, duration: 5, ease: "elastic.out", y: 0 }
  );
