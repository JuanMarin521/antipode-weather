import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import weatherRoutes from "./infrastructure/server/routes/weatherRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// global middleware
app.use(cors());
app.use(express.json());

//healt h check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

//Domain api Routes
app.use('/api/v1/weather', weatherRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
