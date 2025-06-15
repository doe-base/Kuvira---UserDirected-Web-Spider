* Tools and Package used for this project

1. from flask import Flask, request, jsonify, send_from_directory
    Flask: The core web framework you're using.
    request: Lets you access query parameters (?url=...).
    jsonify: Converts Python dictionaries to JSON (for the frontend).
    send_from_directory: Serves static files like index.html.

2. from urllib.parse import urljoin
    Used to resolve relative links on a page into full URLs.

3. from bs4 import BeautifulSoup
    HTML parser. Makes it easy to extract links, forms, and text from the fetched webpage.

4. import requests
    Used to fetch the HTML of a page given its URL.

5. import os
    Not used in the current code, but often included for path/file handling