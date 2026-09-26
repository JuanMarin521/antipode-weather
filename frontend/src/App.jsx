import React, { useState } from 'react';
import GlobeViewer from './components/GlobeViewer';
import { fetchAntipodeWeather } from './services/api';
import { Compass, Thermometer, Wind, Search } from 'lucide-react';

export default function App() {
  const [lat, setLat] = useState('6.2442');
  const [lng, setLng] = useState('-75.5812');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAntipodeWeather(parseFloat(lat), parseFloat(lng));
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGlobeClick = (clickedLat, clickedLng) => {
    setLat(clickedLat.toFixed(4));
    setLng(clickedLng.toFixed(4));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-white">
      {/* 3D Interactive Globe Background */}
      <GlobeViewer
        originCoords={weatherData?.origin.coordinates}
        antipodeCoords={weatherData?.antipode.coordinates}
        onGlobeClick={handleGlobeClick}
      />

      {/* Floating Control Glassmorphism Panel */}
      <div className="absolute top-6 left-6 z-10 w-96 backdrop-blur-md bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-2xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">
          Antipode Weather
        </h1>
        <p className="text-xs text-slate-400 mb-6">Explore the exact opposite point on Earth</p>

        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Calculating...' : 'Find Antipode'}
          </button>
        </form>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs mb-4">
            {error}
          </div>
        )}

        {/* Results cards */}
        {weatherData && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {/* Origin Card */}
            <div className="p-4 bg-blue-950/40 border border-blue-800/40 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Origin Point</span>
                <span className="text-xs text-slate-400">{weatherData.origin.coordinates.latitude}°, {weatherData.origin.coordinates.longitude}°</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-blue-400" />
                  <span className="text-2xl font-bold">{weatherData.origin.weather.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Wind className="w-4 h-4" />
                  <span>{weatherData.origin.weather.windspeed} km/h</span>
                </div>
              </div>
            </div>

            {/* Antipode Card */}
            <div className="p-4 bg-red-950/40 border border-red-800/40 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Exact Antipode</span>
                <span className="text-xs text-slate-400">{weatherData.antipode.coordinates.latitude}°, {weatherData.antipode.coordinates.longitude}°</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  <span className="text-2xl font-bold">{weatherData.antipode.weather.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Wind className="w-4 h-4" />
                  <span>{weatherData.antipode.weather.windspeed} km/h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}