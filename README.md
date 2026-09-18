# Booking App (Hotel Reservation System)

A modern hotel booking web application built with React.  
This project allows users to browse hotels, view details, and make reservations.

This project uses a mock backend powered by JSON Server.

---

## Features

- Browse list of hotels
- View detailed hotel information
- Book hotels easily
- Interactive map integration (Leaflet)
- Date range selection for booking
- Responsive design for all devices
- Client-side routing with React Router
- Real-time API calls using Axios

---

## Technologies Used

- React
- Vite
- React Router DOM
- Axios
- JSON Server (Mock Backend)
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

### 1. Start the backend server (Mock API)

```bash
npm run server
```

Backend runs locally on:

```
http://localhost:5000
```

> Keep this terminal running — the app fetches hotel data from this local server, not from any external API.

---

### 2. Start the frontend (React app)

Open a new terminal and run:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Project Structure

```
server/
  db.json   → Mock database (JSON Server)

src/
  components/
  pages/
  services/
  App.jsx
```

---

## Notes

- This is a personal learning project built for practicing React development.
- This project uses a mock backend powered by JSON Server.
- All data is stored locally in `server/db.json`.
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
