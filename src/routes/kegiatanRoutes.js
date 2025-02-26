const express = require('express');
const { getRekomendasi, pilihKegiatan, submitKegiatan } = require('../controller/kegiatanController.js');
const router = express.Router();

// Endpoint untuk mendapatkan rekomendasi
router.get('/rekomendasi', getRekomendasi);

// Endpoint untuk memilih kegiatan
router.post('/pilih', pilihKegiatan);

// Endpoint untuk submit kegiatan
router.post('/submit', submitKegiatan);

module.exports = router;