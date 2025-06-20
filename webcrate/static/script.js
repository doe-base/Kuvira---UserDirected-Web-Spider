const scanBtn = document.getElementById("scan-btn");
const nextBtn = document.getElementById("next-btn");
const urlInput = document.getElementById("url");
const keywordInput = document.getElementById("keywords");

const resultsSection = document.getElementById("results");
const linksList = document.getElementById("links");
const formsDiv = document.getElementById("forms");
const keywordMatches = document.getElementById("keyword-matches");

const saveLogBtn = document.getElementById("save-log-btn");
const logNoteInput = document.getElementById("log-note");
const logEntriesList = document.getElementById("log-entries");
const headers = document.querySelectorAll(".toggle-header");

let logData = [];
let currentLinkIndex = 0;
let linkQueue = [];



scanBtn.addEventListener("click", () => {
  const url = urlInput.value;
  const keywords = keywordInput.value || "";
  scanBtn.innerText = 'loading...';

  if (!url) return alert("Please enter a URL");

  fetch(`/scan?url=${encodeURIComponent(url)}&keywords=${encodeURIComponent(keywords)}`)
    .then(res => res.json())
    .then(data => {
      scanBtn.innerText = 'Inspect Page';
      resultsSection.style.display = "block";
      displayLinks(data.links);
      displayForms(data.forms);
      displayKeywords(data.keywords);
      setResultHeader()
      linkQueue = data.links;
      currentLinkIndex = 0;
      // if (linkQueue.length > 0) nextBtn.style.display = "inline-block";
    })
    .catch(err => {
      scanBtn.innerText = 'Inspect Page';
      alert("Error scanning page: " + err);
    });
});

// nextBtn.addEventListener("click", () => {
//   currentLinkIndex++;
//   if (currentLinkIndex >= linkQueue.length) {
//     alert("No more links.");
//     return;
//   }
//   urlInput.value = linkQueue[currentLinkIndex];
//   scanBtn.click();
// });

function displayLinks(links) {
  linksList.innerHTML = "";
  links.forEach(link => {
    const li = document.createElement("li");
    li.textContent = link;
    linksList.appendChild(li);
  });
}

function displayForms(forms) {
  formsDiv.innerHTML = "";
  forms.forEach((form, i) => {
    const formBox = document.createElement("div");
    formBox.innerHTML = `
      <strong>Form ${i + 1}</strong><br>
      Action: <code>${form.action}</code><br>
      Method: ${form.method}<br>
      Fields: ${form.fields.join(", ")}
      <hr/>
    `;
    formsDiv.appendChild(formBox);
  });
}

function displayKeywords(words) {
  keywordMatches.innerHTML = "";
  words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    keywordMatches.appendChild(li);
  });
}

saveLogBtn.addEventListener("click", () => {
    const note = logNoteInput.value.trim();
    const url = urlInput.value;
  
    if (!note) return alert("Write something first.");
  
    const entry = { url, note };
    logData.push(entry);
  
    displayLogs();
    logNoteInput.value = "";
});

function displayLogs() {
    logEntriesList.innerHTML = "";
    logData.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>🔗 ${entry.url}</strong><br/>📝 ${entry.note}`;
      logEntriesList.appendChild(li);
    });
}

function setResultHeader(){
  headers.forEach(header => {
    console.log('test')
  
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
}




