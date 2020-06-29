// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function randomFact() {
  const facts =
    ['Sometimes I get my age wrong.', 'I\'m learning Chinese calligraphy.',
      'I could speak 5 languages/dialects (technically).', 'I\'m a huge sports fan'];

  // Pick a random greeting.
  const displayFact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = displayFact;
}

/* Toggle between adding and removing the "responsive" class to nav 
 * when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("mynav");
  if (x.className == "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

// default language = English
var languageCode = "en";

/** parsing & fetching json messages */
async function getComment() {
  const params = new URLSearchParams();
  params.append('languageCode', languageCode);

  const response = await fetch('/data', {method:'GET', headers:params});
  const comments = await response.json();
  const table = document.getElementById('comment-container');

  // remove previous comments in another language
  for (i = table.rows.length-1; i > 0; i--) {  
    table.deleteRow(i);
  }

  comments.forEach((line) => {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = line.date;
    cell2.innerHTML = line.name;
    cell3.innerHTML = line.comment;
  });
}

function getTranslation() {
  languageCode = document.getElementById('language').value;
  getComment();
}
