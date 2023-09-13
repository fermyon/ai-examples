// Listen for the Enter key being pressed
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    newCard();
  }
});

var globalCardCount = 0;
var runningInference = false;

function newCard() {
  if (runningInference) {
    console.log("Already running inference, please wait...");
    setAlert("Already running inference, please wait...");
    return;
  }
  var inputElement = document.getElementById("sentence-input");
  var sentence = inputElement.value;
  if (sentence === "") {
    console.log("Please enter a sentence to analyze");
    setAlert("Please enter a sentence to analyze");
    return;
  }
  inputElement.value = "";

  var cardIndex = globalCardCount;
  globalCardCount++;
  var newCard = document.createElement("div");
  newCard.id = "card-" + cardIndex;
  newCard.innerHTML = `
    <div class="card bg-base-100 shadow-xl w-full">
        <div class="m-4 flex flex-col gap-2">
            <div>${sentence}</div>
            <div class="flex flex-row justify-end">
                <span class="loading loading-dots loading-sm"></span>
            </div>
        </div>
    </div>
    `;
  document.getElementById("sentence-input").before(newCard);

  console.log("Running inference on sentence: " + sentence);
  runningInference = true;
  fetch("/api/sentiment-analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentence: sentence }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateCard(cardIndex, sentence, data.sentiment);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateCard(cardIndex, sentence, sentiment) {
  badge = "";
  if (sentiment === "positive") {
    badge = `<span class="badge badge-success">Positive</span>`;
  } else if (sentiment === "negative") {
    badge = `<span class="badge badge-error">Negative</span>`;
  } else if (sentiment === "neutral") {
    badge = `<span class="badge badge-ghost">Neutral</span>`;
  } else {
    badge = `<span class="badge badge-ghost">Unsure</span>`;
  }
  var cardElement = document.getElementById("card-" + cardIndex);
  cardElement.innerHTML = `
    <div class="card bg-base-100 shadow-xl w-full">
        <div class="m-4 flex flex-col gap-2">
            <div>${sentence}</div>
            <div class="flex flex-row justify-end">
                ${badge}
            </div>
        </div>
    </div>
    `;
  runningInference = false;
}

function setAlert(msg) {
  var alertElement = document.getElementById("alert");
  alertElement.innerHTML = `
    <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="text-error-content">${msg}</span>
    </div>
    `;
  setTimeout(function() {
    alertElement.innerHTML = "";
  }, 3000);
}
