import LoconativeScroll from "loconative-scroll";
export default new LoconativeScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  tablet: {
    breakpoint: 768,
    smooth: false,
  },
});
