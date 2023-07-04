import { results } from "./quizQuest.js";

console.log(results); // Log the results object

// The rest of the code remains unchanged...

function calculateResult(ansArr) {
  if (!ansArr.length) {
    console.log("Answer array is empty.");
    return null; // return null if array is empty
  }

  let monkeyPoints = {}; // object to store points of monkeys

  // loop over the ansArr to sum the points of each monkey
  ansArr.forEach(answerObj => {
    let monkeys = answerObj.monkeys; // get monkeys from the answer object
    let points = answerObj.points; // get points from the answer object

    monkeys.forEach(monkey => {
      // Convert monkey name to lowercase to match keys in results object
      monkey = monkey.toLowerCase();

      if (monkeyPoints[monkey]) {
        monkeyPoints[monkey] += points; // add points to monkey if monkey already exists in object
      } else {
        monkeyPoints[monkey] = points; // add monkey to object with points if it doesn't exist
      }
    });
  });

  // find monkey(s) with highest points
  let maxPoints = 0;
  let maxMonkeys = [];
  for (let monkey in monkeyPoints) {
    if (monkeyPoints[monkey] > maxPoints) {
      maxPoints = monkeyPoints[monkey];
      maxMonkeys = [monkey]; // create a new array for this maximum point value
    } else if (monkeyPoints[monkey] === maxPoints) {
      maxMonkeys.push(monkey); // if current monkey's points are equal to maxPoints, add it to maxMonkeys array
    }
  }

  console.log(maxMonkeys); // Log the maxMonkeys array
  
  // Select a random monkey from maxMonkeys
  let randomIndex = Math.floor(Math.random() * maxMonkeys.length);
  let selectedMonkeyKey = maxMonkeys[randomIndex];

  // return the result associated with the randomly selected monkey with the highest points
  let selectedMonkey = results[selectedMonkeyKey];
  
  console.log(selectedMonkey); // Log the selectedMonkey

  return selectedMonkey;
}

// The rest of the code remains unchanged...


document.addEventListener("DOMContentLoaded", function () {
  const ansArr = JSON.parse(localStorage.getItem("ansArr")) || [];
  const resultSection = document.querySelector("#results");

  if (Array.isArray(ansArr) && ansArr.length === 10 && resultSection) {
    const selectedMonkey = calculateResult(ansArr);

    if (selectedMonkey !== null) {
      // Make sure selectedMonkey is not undefined before destructuring it
      if (typeof selectedMonkey !== "undefined") {
        const { text, description, imageUrl } = selectedMonkey;

        let resultHtml = `
          <h2>${text}</h2>
          <p>${description}</p>
          <button onclick="shareToFacebook()">Share on Facebook</button>
        `;

        if (imageUrl && imageUrl.trim() !== "") {
          resultHtml += `<img src="${imageUrl}" alt="${text}" />`;
        }

        resultSection.innerHTML = resultHtml;
      } else {
        console.log("No result associated with the selected monkey.");
      }
    } else {
      resultSection.innerHTML = "<p>No result found.</p>";
    }
  } else {
    console.log("No valid ansArr found.");
  }

  // Clear the stored ansArr to prevent it from interfering with future quizzes
  localStorage.removeItem("ansArr");
});

