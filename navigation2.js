"use strict";
const STATE = {
    SELECTED: false
};
const duration = 0.5;
const ease = "power3.easeIn";
const slide = new gsap.timeline({
    paused: true,
    onComplete: () => (STATE.SELECTED = !STATE.SELECTED),
    onReverseComplete: () => (STATE.SELECTED = !STATE.SELECTED)
})
    .add(gsap.from(".slideup__container", { duration, ease, y: 100, opacity: 0 }))
    .add(gsap.to(".plus__button", { duration, ease, rotation: 405 }), 0)
    .add(gsap.to(".plus__container", { duration, ease, backgroundColor: "#E9E9E9" }), 0);
const buttonClicked = () => {
    if (!STATE.SELECTED)
        slide.play();
    else
        slide.reverse();
};
const BUTTON = document.querySelector(".plus__container");
BUTTON.addEventListener("click", buttonClicked);
