import { results } from "./quizQuest.js";
import { ansArr } from "./script.js";

console.log("ansArr:", ansArr);

document.addEventListener("DOMContentLoaded", function () {
  const resultSection = document.querySelector("#results");

  if (Array.isArray(ansArr) && ansArr.length === 10 && resultSection) {
    const selectedMonkey = calculateResult(ansArr);

    if (selectedMonkey !== null) {
      const { text, description, imageUrl } = selectedMonkey;

      let resultHtml = `
        <h2>${text}</h2>
        <p>${description}</p>
      `;

      if (imageUrl && imageUrl.trim() !== "") {
        resultHtml += `<img src="${imageUrl}" alt="${text}" />`;
      }

      resultSection.innerHTML = resultHtml;
    } else {
      resultSection.innerHTML = "<p>No result found.</p>";
    }
  } else {
    console.log("No valid ansArr found.");
  }
});
