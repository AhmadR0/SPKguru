import express from 'express';
import login from '../controller/loginControllers.js'
import {hitungRekomendasi,pilihRhk} from '../controller/getRhkController.js';
const router = express.Router();


router.get('/login',(req,res)=>{
   login(req,res);
})


router.get('/rekomendasi/:userId', async (req, res) => {
  try {
    const result = await hitungRekomendasi(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { userId, rk_id } = req.body;
    // Dapatkan data RHK dari database
    const [rhkData] = await pool.query(
      'SELECT * FROM rekomendasi_kegiatan WHERE rk_id = ?', 
      [rk_id]
    );
    
    const result = await pilihRhk(userId, {
      rhk: rhkData[0].rekomendasi,
      point: parseInt(rhkData[0].rk_id.replace(/\D/g,'')) || 8, // Contoh konversi poin
      rk_id
    });
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint untuk submit kegiatan
// router.post('/submit', submitKegiatan);

export default router;