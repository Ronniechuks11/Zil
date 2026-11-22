"""
Zil Propertz Solutions — Flask server.

Run locally:
    pip install -r requirements.txt
    python app.py
Then open http://127.0.0.1:5000
"""
import gzip
from pathlib import Path

from flask import Flask, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent

app = Flask(
    __name__,
    static_folder=str(BASE_DIR / "assets"),
    static_url_path="/assets",
)

# Text formats that shrink well under gzip (photos are already compressed).
COMPRESSIBLE = (
    "text/",
    "application/javascript",
    "application/json",
    "image/svg+xml",
)


@app.after_request
def compress_text(response):
    """Gzip HTML, CSS, JS and SVG for browsers that accept it."""
    if (
        response.status_code != 200
        or "gzip" not in request.headers.get("Accept-Encoding", "")
        or "Content-Encoding" in response.headers
        or not response.mimetype.startswith(COMPRESSIBLE)
    ):
        return response
    response.direct_passthrough = False
    data = response.get_data()
    if len(data) < 800:
        return response
    response.set_data(gzip.compress(data, compresslevel=6))
    response.headers["Content-Encoding"] = "gzip"
    response.headers["Vary"] = "Accept-Encoding"
    response.headers.pop("ETag", None)
    return response


@app.after_request
def cache_assets(response):
    """Photos, CSS and JS are cached by the browser. The ?v= query on the
    stylesheet and script changes whenever they change, so updates still show."""
    if request.path.startswith("/assets/"):
        response.headers["Cache-Control"] = (
            "no-cache" if app.debug else "public, max-age=2592000"
        )
    return response


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
