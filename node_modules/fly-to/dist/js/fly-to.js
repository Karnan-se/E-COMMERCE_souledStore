/**
 * Fly To
 * @name        fly-to
 * @description Fly a DOM element to another element
 * @link        https://github.com/Rodgath/fly-to
 * @author      Rodgath, https://Rodgath.com
 * @version     v1.0.1
 * @created     Sep 12, 2023
 * @updated     Sep 16, 2023
 * @copyright   Copyright (C) 2023-2023, Rodgath
 * @license     MIT
 * @licenseMIT  https://github.com/Rodgath/fly-to/blob/main/LICENSE
 * @demoExample https://rodgath.github.io/fly-to/demo/
 */
function flyTo(flyer, flyTo) {

  let flyerClone = flyer.cloneNode(true);
  flyerClone.style.position = 'absolute';
  flyerClone.style.width = `${flyer.offsetWidth}px`;
  flyerClone.style.height = `${flyer.offsetHeight}px`;
  flyerClone.style.top = `${flyer.offsetTop}px`;
  flyerClone.style.left = `${flyer.offsetLeft}px`;
  flyerClone.style.opacity = 1;
  flyerClone.style.zIndex = 9999;
  document.body.appendChild(flyerClone);

  const targetWidth = flyTo.offsetWidth;
  const targetHeight = flyTo.offsetWidth;
  const currentWidth = flyer.offsetWidth;
  const currentHeight = flyer.offsetWidth;

  const targetX = flyTo.offsetLeft;
  const targetY = flyTo.offsetTop;
  const currentX = flyer.offsetLeft;
  const currentY = flyer.offsetTop;

  const targetOpacity = 0.3;
  const currentOpacity = 1;

  const animationDuration = 1000; // Animation duration in milliseconds

  let startTime = null;

  function animateElement(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = timestamp - startTime;
    const ratio = Math.min(progress / animationDuration, 1);

    const newWidth = currentWidth - (currentWidth - targetWidth) * ratio;
    const newHeight = currentHeight - (currentHeight - targetHeight) * ratio;

    flyerClone.style.width = `${newWidth}px`;
    flyerClone.style.height = `${newHeight}px`;

    const deltaX = currentX - (currentX - targetX) * ratio;
    const deltaY = currentY - (currentY - targetY) * ratio;

    flyerClone.style.left = `${deltaX}px`;
    flyerClone.style.top = `${deltaY}px`;

    flyerClone.style.opacity = currentOpacity - (currentOpacity - targetOpacity) * ratio;

    if (ratio < 1) {
      requestAnimationFrame(animateElement);
    } else {
      setTimeout(function () {
        flyTo.style.visibility = 'hidden';
        setTimeout(function () {
          flyTo.style.visibility = 'visible';
          setTimeout(function () {
            flyerClone.style.display = 'visible';
            setTimeout(function () {
              flyerClone.remove();
            }, 200);
          }, 250);
        }, 250);
      }, 250);
    }
  }

  requestAnimationFrame(animateElement);
}