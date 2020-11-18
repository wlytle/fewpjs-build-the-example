// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";
const errorFlag = document.querySelector("#modal");

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  handleLike();
});

function handleResponse(btn) {
  if (errorFlag.className === "") {
    errorFlag.setAttribute("class", "hidden");
  }
  let heart = btn.querySelector("span");
  switch (heart.innerText) {
    case EMPTY_HEART:
      heart.innerText = FULL_HEART;
      heart.setAttribute("class", "activated-heart");
      break;
    case FULL_HEART:
      heart.innerText = EMPTY_HEART;
      heart.removeAttribute("class", "activated-heart");
      break;
    default:
      console.log("What the hell are you clicking at?");
  }
}

function handleError() {
  errorFlag.removeAttribute("class");
  let timeoutID = window.setTimeout(
    () => errorFlag.setAttribute("class", "hidden"),
    5000
  );
}

function handleLike() {
  const likeBtns = Array.from(document.querySelectorAll("li.like"));
  for (const btn of likeBtns) {
    btn.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          handleResponse(btn);
        })
        .catch(() => {
          handleError();
        });
    });
  }
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
