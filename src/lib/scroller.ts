import LoconativeScroll from "loconative-scroll";
console.log("hello");
export default new LoconativeScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  touchMultiplier: 2,
  tablet: {
    breakpoint: 768,
    smooth: true,
  },
});
