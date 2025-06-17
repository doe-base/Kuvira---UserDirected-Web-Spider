# 🕷️ Kuvira - User-Directed Web Spider

**Kuvira** is a lightweight, user-directed spidering tool for manually exploring web applications one page at a time. Built with a dark-themed HTML/JS interface and a Python Flask backend, it allows ethical hackers and researchers to examine links, forms, and keywords interactively — not blindly.

---

## 🚀 Features

- 🔍 Enter a URL and keywords to scan a page
- 🧭 Crawl **one page at a time**, user-controlled
- 🧾 View:
  - All page links
  - All forms (with method, action, and input fields)
  - Matched keywords in the page text
- 📝 Add personal **log notes** for each scanned page
- 🌙 Dark-themed frontend UI (HTML, CSS, JavaScript)
- 🧠 Designed for **manual** recon, not automated scraping

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS (Dark Theme), JavaScript (Vanilla)
- **Backend**: Python, Flask, BeautifulSoup
- **Optional**: Can be extended with Selenium for JS-heavy sites

---

## 📁 Project Structure
webcrate/
│
├── app.py # Flask backend logic
├── static/ # Frontend files
│ ├── index.html
│ ├── style.css
│ └── script.js
├── webcrate-env/ # Python virtual environment (should be gitignored)
└── README.md # Project documentation


## Todos
- Improve UX
- Create option to download data gotten