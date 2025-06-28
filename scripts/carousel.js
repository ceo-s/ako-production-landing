import EmblaCarousel from "embla-carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

// Grab wrapper nodes
const rootNode = document.querySelector(".embla");
const viewportNode = rootNode.querySelector(".embla__viewport");

// Grab button nodes
const prevButtonNode = rootNode.querySelector(".embla__prev");
const nextButtonNode = rootNode.querySelector(".embla__next");

const options = { loop: true };
const emblaApi = EmblaCarousel(viewportNode, options, [WheelGesturesPlugin()]);

prevButtonNode.addEventListener("click", emblaApi.scrollPrev, false);
nextButtonNode.addEventListener("click", emblaApi.scrollNext, false);

console.log(emblaApi.slideNodes()); // Access API
