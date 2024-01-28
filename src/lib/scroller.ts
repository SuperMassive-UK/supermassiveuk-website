import LocomotiveScroll from "locomotive-scroll";
console.log("hello");
export default new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  touchMultiplier: 2,
  tablet: {
    breakpoint: 768,
    smooth: false,
  },
});
