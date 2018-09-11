let html = document.documentElement;
let recalc = function() {
  let h = window.innerHeight;
  let w = window.innerWidth;
  //横屏情况下，以height为width
  let width = w > h ? h : w;
  width = width > 720 ? 720 : width;
  let fz = 100 * (width / 720);
  html.style.fontSize = fz + "px";
  var realfz =
    ~~(
      +window
        .getComputedStyle(document.getElementsByTagName("html")[0])
        .fontSize.replace("px", "") * 10000
    ) / 10000;
  if (fz !== realfz) {
    document.getElementsByTagName("html")[0].style.cssText =
      "font-size: " + fz * (fz / realfz) + "px";
  }
};
window.addEventListener("resize", recalc, false);
window.addEventListener("orientationchange", recalc, false);
document.addEventListener("DOMContentLoaded", recalc, false);