import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import kegiatanRoutes from './routes/routes.js';

// Inisialisasi app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Gunakan routes
app.use('/kegiatan', kegiatanRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});