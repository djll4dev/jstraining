// Input Elements
let playerName = document.querySelector(".name");
let tries = document.querySelector(".tries");
// Manipulation Elements
let blocks = document.querySelectorAll(".block");
// Btn Elements
let startBtn = document.querySelector(".start");
let showBtn = document.querySelector(".show");
let restartBtn = document.querySelector(".restart");

// Setting Orders Nums
let orders = [];
for (let i = 1; i <= blocks.length; i++) {
  orders.push(i);
}

// Start Playing
let hasStart = false;
let firstClicked;
startBtn.addEventListener("click", function (e) {
  if (!hasStart) {
    playerName.textContent = prompt(
      "What Is Your Name?",
      "Write Your Name Here."
    );
    if (playerName.textContent.trim()) {
      startBtn.parentElement.remove();
      changeOrders();
      // Show Cards For A Moment Then Setting Functionality
      blocks.forEach((block) => {
        block.classList.add("flipped");
        setTimeout(() => {
          block.classList.remove("flipped");
        }, 3000);
        block.addEventListener("click", function (e) {
          block.classList.add("flipped", "event-none");
          if (!firstClicked) {
            firstClicked = block;
          } else {
            compareCards(firstClicked, e.currentTarget);
          }
        });
      });
    }
  }
});

// Show Pairs Btn Functionlity
showBtn.addEventListener("click", function () {
  playVideo(3);
});

// Restart Game Btn Functionality
restartBtn.addEventListener("click", restartGame);

/******* Functions *******/

// Changing Orders
function changeOrders() {
  let ordersCopy = orders.join(" ").split(" ");
  blocks.forEach((block) => {
    let order = ordersCopy[Math.floor(Math.random() * ordersCopy.length)];
    ordersCopy.splice(ordersCopy.indexOf(order), 1);
    block.style.order = order;
  });
}

// Compare Cards
function compareCards(a, b) {
  if (
    a.querySelector(".back img").getAttribute("src") ===
    b.querySelector(".back img").getAttribute("src")
  ) {
    // Disable Each Card
    [a, b].forEach((card) => card.classList.add("match"));
    // Reset firstClicked Card
    firstClicked = "";
    // Play Match Video
    playVideo(1);
    // If Every Block Has Match
    if ([...blocks].every((block) => block.classList.contains("match"))) {
      playVideo(2);
    }
  } else {
    // Play Wrong Try Video
    playVideo(0);
    // Set Time Before Unflip The Cards
    setTimeout(() => {
      [a, b].forEach((card) => card.classList.remove("flipped", "event-none"));
    }, 1500);
    // Reset First Clicked Card
    firstClicked = "";
    // Increment Tries Num
    ++tries.textContent;
  }
}

// Play Video According To Try Result
function playVideo(result) {
  let video;
  // Assign The Right Video
  if (!result) {
    let wrongTryVideos = document.querySelectorAll(".wrong");
    video = wrongTryVideos[Math.floor(Math.random() * wrongTryVideos.length)];
  } else if (result === 1) {
    video = document.querySelector("video.match");
  } else if (result === 2) {
    video = document.querySelector(".complete");
  } else {
    video = document.querySelector(".show-v");
  }
  // Stop Click Event For Each Block
  blocks.forEach((block) => {
    block.classList.add("event-none");
    console.log("d");
  });
  // Play Video
  console.log(video);
  setTimeout(() => {
    video.style.display = "initial";
    video.play();
  }, 500);
  video.addEventListener("ended", function () {
    this.style.display = "none";
    // Return Click Event For Each Block
    blocks.forEach((block) => block.classList.remove("event-none"));
  });
}

// Restart Game
function restartGame() {
  firstClicked = "";
  tries.textContent = 0;
  blocks.forEach((block) => block.classList.remove("flipped", "match"));
  changeOrders();
}
