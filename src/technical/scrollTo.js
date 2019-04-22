import { easings } from "./easings";

// Function adapted fromhttps://pawelgrzybek.com/page-scroll-in-vanilla-javascript/

export function scrollTo(
  container,
  destination,
  duration = 200,
  easingType = "linear",
  callback
) {
  const start = container.scrollLeft;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const destinationOffsetToScroll =
    typeof destination === "number" ? destination : destination.offsetLeft;

  function scroll() {
    const now =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easingType](time);

    container.scrollTo({
      left: Math.ceil(
        timeFunction * (destinationOffsetToScroll - start) + start
      )
    });

    if (container.scrollLeft === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
