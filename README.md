# Zil Propertz Solutions — website starter

A responsive, animation-rich real estate website built with plain HTML, CSS and JavaScript. GSAP + ScrollTrigger are used as progressive enhancement from CDN; the core site still works without them.

## 1. Run the site with Flask

1. Extract the zip and open a terminal inside the `zil-propertz-website` folder (the one containing `app.py`).
2. Install the requirements:

   ```bash
   pip install -r requirements.txt
   ```

   On Windows, use `py -m pip install -r requirements.txt` if `pip` isn't recognised.

3. Start the server:

   ```bash
   python app.py
   ```

4. Open `http://127.0.0.1:5000` in your browser.

`app.py` serves `index.html` at the homepage and the `assets/` folder for images, CSS and JavaScript. A `/health` route returns `{"status": "ok"}` for quick checks. Debug mode is on while you develop; turn it off (`debug=False`) before deploying.

## 2. Included property photography

Your nine uploaded photos have been converted to optimized JPGs and placed in `assets/images/`:

| File | Photo |
|---|---|
| `exterior-front.jpg` | Front exterior / hero |
| `exterior-porch.jpg` | Entrance porch and side exterior |
| `driveway-overview.jpg` | Stamped concrete driveway, elevated view |
| `interior-hallway.jpg` | Marble hallway, LED ceiling and glass rail |
| `master-bedroom.jpg` | Master bedroom |
| `kitchen-warm.jpg` | Warm/tan kitchen |
| `kitchen-monochrome.jpg` | Black and white kitchen |
| `garden-driveway.jpg` | Garden and driveway |
| `upper-balcony.jpg` | Upper balcony |

The third listing (ZP-003) includes five exterior photographs named `centenary-6bed-*.jpg`. The fourth listing (ZP-004) includes nine supplied photographs named `centenary-4bed-*.jpg`. Both listings have matching responsive WebP files.

To replace a photo, use the same filename or update its path in `assets/js/main.js` and `index.html` where it is used in a section image.

## 3. Add your official logo

The included `assets/logo.svg` is a temporary stacked house-and-wordmark lockup, matching the requested icon-above-name direction. Replace it with the official supplied Zil Propertz logo when ready. Keep the filename `logo.svg` if you export it as SVG, or update the image references in `index.html` if you use a PNG/WebP file.

The preloader draws its own simple inline house outline and typesets the name separately.

## 4. Add another property

All property cards, search filtering and the detail modal read from one array near the top of `assets/js/main.js` called `properties`.

Copy the existing object and add a new one. Keep the same fields:

```js
{
  id: 'ZP-002',
  title: 'Property title',
  status: 'For Sale',       // or 'For Rent'
  type: 'Detached House',  // Apartment, Land, Commercial, etc.
  location: 'Area, State',
  price: 250000000,        // number, not formatted text
  bedrooms: 4,
  images: [
    'assets/images/new-property-front.jpg',
    'assets/images/new-property-interior.jpg'
  ]
}
```

Place the new photos inside `assets/images/`. The main listing grid and property detail gallery will update from the array automatically. The gallery accepts any number of images.

## 5. Replace contact placeholders before launch

Search the site for `Add official`, `Add your verified`, `replace-this-with-your-email` and update those values.

- **Form destination:** change `contactEmail` at the top of `assets/js/main.js` to the business email address. The current form uses a `mailto:` action and does not store enquiries. For reliable lead capture, connect a form endpoint or backend before launch.
- **Phone:** replace the `Add official phone number` text in `index.html` with the verified business number and a matching `tel:` link.
- **Email:** replace the `Add official email address` text with the verified address and a matching `mailto:` link.
- **Office:** add only the verified business address.
- **Socials:** replace the temporary `#contact` links with the official Instagram, Facebook and LinkedIn URLs.

## 6. Facts intentionally left editable

The first property is listed with only the facts supplied: luxury 7-bedroom detached house, for sale, ₦400,000,000, City Estate, Enugu State. Bathrooms, floor area, title details, amenities, agent names and other specifications are not guessed. The company performance metric in the about section is an explicit placeholder until verified figures are supplied.

The journal cards and service-principle carousel are starter editorial content. Replace or approve them before using them as published company content. A verified client-review carousel can replace the service-principle slides once Zil has approved client quotes and permission to publish them; no testimonials have been invented.

## 7. Motion and performance notes

- First-visit brand preloader runs in under four seconds; subsequent visits in the same browser session skip it.
- `prefers-reduced-motion` is respected.
- The property modal has a swipeable thumbnail gallery and a separate full-screen lightbox.
- Images below the fold use lazy loading.
- If the GSAP CDN is unavailable, core navigation, filters, modal, gallery and content remain usable.

## 8. Current listings log

| ID | Property | Location | Price | Title | Photos |
|---|---|---|---|---|---|
| ZP-001 | Luxury 7-Bedroom Detached House | City Estate, Enugu State | ₦400,000,000 | To be confirmed | `exterior-*.jpg`, `interior-*.jpg`, `kitchen-*.jpg`, etc. |
| ZP-002 | Contemporary 5-Bedroom Duplex | Centenary City Estate, Enugu State | ₦250,000,000 | C of O | `centenary-*.jpg` (8 photos) |
| ZP-003 | 6-Bedroom Duplex | Centenary City Estate, Enugu State | ₦220,000,000 | C of O | `centenary-6bed-*.jpg` (5 photos) |
| ZP-004 | Contemporary 4-Bedroom Duplex | Centenary City Estate, Enugu State | ₦200,000,000 | C of O | `centenary-4bed-*.jpg` (9 photos) |

To add a listing, copy an object in the `properties` array in `assets/js/main.js`. Optional fields: `titleDeed`, `description` and `labels` (one caption per photo). The filters, location list, property-type list and listing count update automatically.

## 9. Fonts, speed and animation

- **Typefaces:** Newsreader for headings and Figtree for body text and buttons, both loaded from Google Fonts. The smallest text on the site is 12px, body copy is 16px, and form fields are 16px so phones don't zoom when a field is tapped.
- **Photos:** Each JPG has three WebP sizes (480, 800 and 1080 px). Phones download the smallest size that looks sharp, and laptops download the largest. After adding or replacing photos, run `python tools/make_webp.py` (needs `pip install pillow`). Then add the new file's path to the listing in `assets/js/main.js` as before.
- **Caching:** Flask gzips HTML, CSS, JS and SVG, and tells browsers to keep photos, CSS and JS for 30 days. The `?v=` number on the stylesheet and script is the version: raise it whenever you change those files, so returning visitors see the update. The property script is now `?v=10`.
- **Animation:** Motion uses only transform and opacity, which the phone or laptop can render smoothly. Visitors who turn on "reduce motion" in their device settings see the content without animation.
- **First visit:** The intro takes about two seconds. It plays only once per browser session.
