from flask import Flask, request, jsonify, send_from_directory
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import requests
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

    try:
        res = requests.get(url, timeout=5)
        res.raise_for_status()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    soup = BeautifulSoup(res.text, "html.parser")

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

    print("This is it:", links)

    return jsonify({
        "links": links,
        "forms": forms,
        "keywords": matched_keywords
    })

if __name__ == "__main__":
    app.run(debug=True)
