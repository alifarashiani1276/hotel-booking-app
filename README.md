# Booking App (Hotel Reservation System)

A modern hotel booking web application built with React.  
This project allows users to browse hotels, view details, and make reservations.

---

## Features

- Browse list of hotels
- View detailed hotel information
- Book hotels easily
- Interactive map integration (Leaflet)
- Date range selection for booking
- Responsive design for all devices
- Client-side routing with React Router

---

## Technologies Used

- React
- Vite
- React Router DOM
- Axios
- React Leaflet
- React Icons
- React Date Range
- React Hot Toast
- Date-fns

---

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
```

Install dependencies:

```bash
npm install
```

---

## Running the Project

```bash
npm run dev
```

The app runs on `http://localhost:5173`. No separate backend is needed.

> Hotels are loaded from a static file (`src/data/hotels.json`) and bookmarks are stored in the browser's `localStorage` (seeded from `src/data/bookmarks.json` the first time). The data layer lives in `src/api/db.js`, so the project deploys to Vercel as a plain static Vite app.

---

## Hotel Images

Every hotel has its own real photo. The app tries these sources in order and shows the first one that loads: the local file (`image` field in `src/data/hotels.json`) → the original Airbnb photo → the opendatasoft copy → smaller sizes → `/123.jpg`.

To save the photos inside the project (so the app never depends on an external site, e.g. on Vercel), run once:

```bash
npm run images
```

This downloads each hotel's photo to `public/hotels/<id>.jpg` and sets the `image` field automatically. Commit the `public/hotels/` folder afterwards.

To use your own photo for a hotel, put it in `public/hotels/` and set that hotel's `"image"` in `src/data/hotels.json` (e.g. `"/hotels/6017649.jpg"`).

---

## Project Structure

```
src/
  api/db.js            → Client-side "backend" (hotels + bookmarks)
  data/hotels.json     → Static hotel data
  data/bookmarks.json  → Initial bookmarks
  utils/hotelImage.js  → Image source fallback chain
scripts/
  download-images.mjs  → Downloads real hotel photos into public/hotels/
  components/
  hooks/
  App.jsx
```

---

## Notes

- This is a personal learning project built for practicing React development.
- Bookmarks (created by clicking on the map) are saved per browser in `localStorage`.
- Adding a bookmark by clicking a spot on the map uses free reverse geocoding (OpenStreetMap Nominatim, no API key needed); if the spot isn't a valid city, an error toast is shown instead of failing silently.
- UI has been redesigned with a minimal, modern style (Plus Jakarta Sans / system font stack, coral + teal color palette).

---

## Future Improvements

- User authentication system
- Real backend integration (Node.js / Express)
- Payment gateway integration
- Advanced filtering and search
- User reviews and ratings system

---

## Author

Ali  
Front-End Developer (React / JavaScript)
