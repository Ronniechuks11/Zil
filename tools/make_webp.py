"""
Create the responsive WebP versions of every JPG in assets/images/.

Run this after adding or replacing photos:
    pip install pillow
    python tools/make_webp.py

For each photo.jpg it writes three siblings:
    photo-sm.webp   480 px wide   (small phones, thumbnails)
    photo-md.webp   800 px wide   (phones at high density)
    photo-lg.webp   1080 px wide  (laptops and desktops)
The site picks the right one for each screen automatically.
"""
from pathlib import Path

from PIL import Image

IMAGES = Path(__file__).resolve().parent.parent / "assets" / "images"
SIZES = {"sm": (480, 78), "md": (800, 78), "lg": (1080, 80)}  # (max width, quality)

for jpg in sorted(IMAGES.glob("*.jpg")):
    original = Image.open(jpg).convert("RGB")
    for name, (width, quality) in SIZES.items():
        frame = original.copy()
        frame.thumbnail((width, width * 2), Image.LANCZOS)  # never upscales
        frame.save(jpg.with_name(f"{jpg.stem}-{name}.webp"), "WEBP", quality=quality, method=6)
    print("done:", jpg.name)
