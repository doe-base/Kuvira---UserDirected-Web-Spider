from flask import Flask, request, jsonify, send_from_directory
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

app = Flask(__name__, static_folder='static')

@app.route("/")
def home():
    return send_from_directory("static", "index.html")

@app.route("/scan")
def scan():
    url = request.args.get("url")
    raw_keywords = request.args.get("keywords", "")
    keywords = [k.strip().lower() for k in raw_keywords.split(",") if k.strip()]

    # Set up headless browser
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    try:
        driver = webdriver.Chrome(options=chrome_options)
        driver.get(url)
        html = driver.page_source
        driver.quit()
    except Exception as e:
        print('problem here')
        return jsonify({"error": str(e)}), 400

    soup = BeautifulSoup(html, "html.parser")

    # Extract links
    links = [urljoin(url, a["href"]) for a in soup.find_all("a", href=True)]

    # Extract forms
    forms = []
    for form in soup.find_all("form"):
        action = urljoin(url, form.get("action", ""))
        method = form.get("method", "get").lower()
        fields = [i.get("name") for i in form.find_all("input") if i.get("name")]
        forms.append({"action": action, "method": method, "fields": fields})

    # Keyword matches
    text = soup.get_text().lower()
    matched_keywords = [kw for kw in keywords if kw in text]

    return jsonify({
        "links": links,
        "forms": forms,
        "keywords": matched_keywords
    })

if __name__ == "__main__":
    app.run(debug=True)
