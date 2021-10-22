score = 0;
cross = true;

audio = new Audio("music.mp3");
audiogo = new Audio("gameover.mp3");
setTimeout(() => {
  audio.play();
}, 1000);
document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38 || e.keyCode == 32) {
    car = document.querySelector(".car");
    car.classList.add("animateCar");
    setTimeout(() => {
      car.classList.remove("animateCar");
    }, 700);
  }

  if (e.keyCode == 39) {
    car = document.querySelector(".car");
    carX = parseInt(
      window.getComputedStyle(car, null).getPropertyValue("left")
    );
    car.style.left = carX + 112 + "px";
  }

  if (e.keyCode == 37) {
    car = document.querySelector(".car");
    carX = parseInt(
      window.getComputedStyle(car, null).getPropertyValue("left")
    );
    car.style.left = carX - 112 + "px";
  }
};

setInterval(() => {
  car = document.querySelector(".car");
  gameOver = document.querySelector(".gameOver");
  hurdle = document.querySelector(".hurdle");

  cx = parseInt(window.getComputedStyle(car, null).getPropertyValue("left"));
  cy = parseInt(window.getComputedStyle(car, null).getPropertyValue("top"));
  hx = parseInt(window.getComputedStyle(hurdle, null).getPropertyValue("left"));
  hy = parseInt(window.getComputedStyle(hurdle, null).getPropertyValue("top"));

  offsetX = Math.abs(cx - hx);
  offsetY = Math.abs(cy - hy);
  // console.log(offsetX, offsetY);
  if (offsetX < 73 && offsetY < 72) {
    gameOver.style.visibility = "visible";
    hurdle.classList.remove("hurdleAni");
    car.style.visibility = "visible";
    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(hurdle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      hurdle.style.animationDuration = newDur + "s";
      console.log("New animation duration: ", newDur);
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
