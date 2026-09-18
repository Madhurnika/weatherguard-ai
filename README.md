# WeatherGuard AI

## Project Overview
WeatherGuard AI is a full-stack weather monitoring and early-warning prototype. It turns current conditions and forecasts into risk explanations, comfort scoring, activity ideas, and practical travel guidance.

## Features
- City search and browser geolocation
- Current conditions, hourly and seven-day forecasts
- Rule-based system-generated risk analysis
- Weather comfort score and recommendations
- Travel/activity advisors
- Recharts trend analytics and Leaflet map
- Favorites, recent searches, theme, and units in localStorage
- Responsive dark/light dashboard
- Demo mode when no API key is configured

## Architecture
The React frontend calls an Express backend. The backend is the only layer that calls OpenWeatherMap, so the API key stays server-side. The service layer returns a stable typed contract that can later be backed by PostgreSQL or MongoDB.

## Technology Stack
React, TypeScript, Vite, Tailwind-compatible responsive CSS, Lucide React, Recharts, Leaflet, Axios, Node.js, Express, dotenv, CORS.

## Installation
From `weatherguard-ai/`:

```powershell
npm.cmd run install-all
```

## Environment Variables
Copy `backend/.env.example` to `backend/.env` and set `OPENWEATHER_API_KEY` and `PORT=5000`. Copy `frontend/.env.example` to `frontend/.env` if you need to change the API base URL.

## OpenWeatherMap API Setup
Create an OpenWeatherMap account, generate an API key, and place it only in `backend/.env`. Never add it to React code or commit it.

## Running
```powershell
npm.cmd run dev
```
Backend: `http://localhost:5000`  
Frontend: Vite's default `http://localhost:5173`

Individual services:
```powershell
npm.cmd run backend
npm.cmd run frontend
```

## Demo Mode
Without `OPENWEATHER_API_KEY`, the backend returns realistic simulated Chennai weather and marks the payload `demoMode: true`. The complete dashboard remains usable, including charts, risks, recommendations, and map.

## API Endpoints
- `GET /api/health`
- `GET /api/weather/city/:city`
- `GET /api/weather/coordinates?lat=XX&lon=YY`
- `GET /api/weather/forecast/:city`

## Location Permission
Use **Use my current location** and allow the browser prompt. If denied, search manually; the app does not crash.

## Disclaimer
Risk assessments, comfort scores, and travel guidance are WeatherGuard AI prototype outputs, not official meteorological, emergency, or travel advisories.

## Future Scope
Machine-learning prediction, IoT sensors, satellite/radar integration, government alerts, flood prediction, crop advisory, voice assistant, multilingual support, mobile apps, and historical weather storage.
