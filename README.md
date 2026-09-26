# 🌍 Antipode Weather

> **Discover the exact opposite side of the world with real-time 3D solar visualization and weather data.**

An immersive full-stack web application built with **Clean Architecture** and **Three.js**. It calculates the antipodal point for any geographic coordinate, renders an interactive 3D Earth globe illuminated by real-time solar positioning, and fetches current weather reports for both locations.

---

##  Features

  - ** Interactive 3D Globe**: Rendered with `react-globe.gl` and `Three.js` featuring atmospheric glow, city night lights, manual rotation, and smooth camera fly-to animations.
  - ** Real-Time Solar Position**: Dynamic directional lighting computed from the current subsolar point for accurate solar terminator shading.
  - ** Precise Pulsing Markers**: Single-pulse concentric rings tightly aligned to the Earth's surface with zero 3D cylinder extrusion artifacting.
  - ** Input Normalization & Validation**: Automatically handles polar regions ($\pm 90^\circ$), exact antipodes ($180^\circ$), and comma-to-dot decimal normalization.
  - ** Clean Architecture Backend**: Decoupled domain entities, use cases, and infrastructure route handlers using Node.js / Express.
  - ** Glassmorphism UI**: Sleek floating control panel built with React and Tailwind CSS v4.
  
  ---
  
 ##  Tech Stack & Dependencies

  ### Backend Dependencies
  - **`express`**: Fast, unopinionated web framework for Node.js.
  - **`cors`**: Middleware to enable Cross-Origin Resource Sharing with the frontend.
  - **`dotenv`**: Zero-dependency module that loads environment variables from `.env`.
  - **`axios`**: Promise-based HTTP client for external API requests (Open-Meteo).
  
  ### Frontend Dependencies
  - **`react` & `react-dom`**: UI library and DOM renderer.
  - **`react-globe.gl`**: React bindings for `three-globe` (3D data visualization).
  - **`three`**: JavaScript 3D WebGL library.
  - **`lucide-react`**: Modern icon library.
  - **`axios`**: HTTP client to communicate with the backend.
  - **`tailwindcss` & `@tailwindcss/vite`**: Utility-first CSS framework (v4).
        
  ---
  
  ##  Prerequisites
  
  Ensure you have the following installed on your machine:
  
  - **Node.js**: `v18.0.0` or higher
  - **npm**: `v9.0.0` or higher
  - **Git**
  
  ---
  
  ##  Quick Start Guide
  
  ### 1. Clone the Repository
  
  ```bash
  git clone [https://github.com/your-username/antipode-weather.git](https://github.com/your-username/antipode-weather.git)
  cd antipode-weather
```
2. Backend Setup
Open a terminal window and navigate to the backend directory:

        # Navigate to backend directory
        cd backend
        
        # Install dependencies
        npm install
        
        # Create environment file
        echo "PORT=3001" > .env
        
        # Start development server
        npm run dev

4. Frontend Setup
Open a new terminal window and navigate to the frontend directory:

        # Navigate to frontend directory
        cd frontend
        
        # Install dependencies
        npm install
        
        # Start Vite development server
        npm run dev

Project Architecture
    
    Oposite-poles/
    ├── backend/
    │   ├── src/
    │   │   ├── application/
    │   │   ├── domain/
    │   │   │   ├── entities/
    │   │   │   │   └── Coordinates.js          # Core domain entity & coordinate validation
    │   │   │   └── services/
    │   │   │       └── antipodeCalculator.js   # Domain logic for antipodal math
    │   │   └── infrastructure/
    │   │       ├── external-apis/
    │   │       │   └── openMeteoClient.js      # Weather data API integration
    │   │       ├── server/
    │   │       │   ├── controller/
    │   │       │   │   └── weatherController.js# Express route handlers
    │   │       │   └── routes/
    │   │       │       └── weatherRoutes.js    # API route definitions
    │   │       └── index.js                    # Server entry point
    │   ├── .env
    │   ├── package-lock.json
    │   └── package.json
    │
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   │   └── GlobeViewer.jsx             # 3D Globe component & WebGL setup
    │   │   ├── services/
    │   │   │   └── api.js                      # API HTTP client wrapper
    │   │   ├── utils/
    │   │   │   └── sunPosition.js              # Subsolar mathematical calculations
    │   │   ├── App.jsx                         # Main UI component & state
    │   │   ├── index.css
    │   │   └── main.jsx
    │   ├── index.html
    │   ├── vite.config.js
    │   ├── package-lock.json
    │   └── package.json
    │
    ├── .gitignore
    └── README.md
    
Key Files Overview
```
Coordinates.js: Core domain entity with validation and comma-to-dot normalization.

antipodeCalculator.js: Domain service encapsulating antipodal mathematical formulas.

openMeteoClient.js: External API integration client for weather data retrieval.

weatherController.js & weatherRoutes.js: Infrastructure HTTP route handlers and endpoints.

GlobeViewer.jsx: 3D Globe WebGL component handling lights, markers, dynamic rings, and camera transitions.

sunPosition.js: Mathematical calculation of real-time subsolar points for realistic lighting.
```
Technical Highlights
```
   Decimal Separator Normalization: Inputs with European-style comma decimals (e.g., 88,4168) are automatically converted to standard dot notation (88.4168) both in the domain entity and UI layer to prevent HTTP 400 validation failures.
      
  WebGL Lifecycle Management: Rings use dynamic composite keys (ringKey="${id}-${lat}-${lng}") to force WebGL mesh disposal when coordinates change, preventing lingering ring stacks or overlapping artifacts.
      
  Surface Marker Alignment: Point altitude is locked at 0 (pointAltitude={0}), eliminating 3D cylinder height extrusions and keeping marker points perfectly aligned with pulsing rings.
```
 License
```
  This project is open-source and available under the MIT License.
```
