const { kegiatan, userKegiatan } = require('../models/dummyData.js');

const MAX_PENGULANGAN = 2;

// Fungsi untuk menghitung total poin yang sudah dipilih user
const hitungPoinTerpilih = (userId) => {
  const kegiatanUser = userKegiatan.filter(uk => 
    uk.UserId === userId && uk.status === 'draft'
  );
  
  // Hitung total poin dengan memperhitungkan pengulangan
  const totalPoin = kegiatanUser.reduce((total, uk) => {
    const kegiatanTerpilih = kegiatan.find(k => k.id === uk.KegiatanId);
    return total + (kegiatanTerpilih.poin * (uk.jumlah_pengulangan || 1));
  }, 0);

  return totalPoin;
};

// Fungsi untuk mencari kombinasi kegiatan yang memenuhi target poin
const cariKombinasiKegiatan = (kegiatanTersedia, targetPoin, userId) => {
  let kombinasiTerbaik = [];

  // Fungsi rekursif untuk mencari kombinasi
  const cariKombinasi = (index, kombinasiSaatIni, poinSaatIni) => {
    if (poinSaatIni === targetPoin) {
      kombinasiTerbaik = kombinasiSaatIni;
      return;
    }

    if (poinSaatIni > targetPoin || index >= kegiatanTersedia.length) {
      return;
    }

    const kegiatanSaatIni = kegiatanTersedia[index];
    
    // Hitung berapa kali kegiatan ini sudah dipilih user
    const jumlahDipilih = userKegiatan.filter(uk => 
      uk.UserId === userId && uk.KegiatanId === kegiatanSaatIni.id
    ).length;

    // Hitung sisa pengulangan yang diizinkan
    const sisaPengulangan = MAX_PENGULANGAN - jumlahDipilih;
    
    // Jika masih bisa dipilih ulang
    if (sisaPengulangan > 0) {
      const maxPengulangan = Math.min(
        sisaPengulangan,
        Math.floor((targetPoin - poinSaatIni) / kegiatanSaatIni.poin)
      );

      for (let i = 1; i <= maxPengulangan; i++) {
        cariKombinasi(
          index + 1,
          [...kombinasiSaatIni, { ...kegiatanSaatIni, jumlah_pengulangan: i }],
          poinSaatIni + (kegiatanSaatIni.poin * i)
        );
      }
    }

    // Coba tanpa kegiatan saat ini
    cariKombinasi(index + 1, kombinasiSaatIni, poinSaatIni);
  };

  cariKombinasi(0, [], 0);
  return kombinasiTerbaik;
};

// Fungsi untuk menghitung rekomendasi
const hitungRekomendasi = (userId, targetPoin = 32) => {
  // 1. Hitung total poin yang sudah dipilih user
  const poinTerpilih = hitungPoinTerpilih(userId);

  // 2. Hitung sisa poin yang dibutuhkan
  const sisaPoin = targetPoin - poinTerpilih;

  // 3. Jika poin sudah terpenuhi
  if (sisaPoin <= 0) {
    return { status: 'Poin sudah terpenuhi', rekomendasi: [] };
  }

  // 4. Cari kegiatan yang memenuhi sisa poin
  const kegiatanTersedia = kegiatan.filter(k => k.poin <= sisaPoin);

  // 5. Cari kombinasi terbaik
  const kombinasiTerbaik = cariKombinasiKegiatan(kegiatanTersedia, sisaPoin, userId);

  // 6. Kembalikan rekomendasi
  return {
    status: 'Berhasil',
    rekomendasi: kombinasiTerbaik
  };
};

// Endpoint untuk mendapatkan rekomendasi
const getRekomendasi = (req, res) => {
  const userId = 1; // Dummy user ID
  const rekomendasi = hitungRekomendasi(userId);
  res.json(rekomendasi);
};

// Endpoint untuk memilih kegiatan
// Endpoint untuk memilih kegiatan
const pilihKegiatan = (req, res) => {
    const { kegiatanId, jumlah_pengulangan = 1 } = req.body;
    const userId = 1; // Dummy user ID
  
    // Cek berapa kali kegiatan ini sudah dipilih user
    const totalDipilih = userKegiatan.filter(uk => 
      uk.UserId === userId && uk.KegiatanId === kegiatanId
    ).length;
  
    // Validasi: maksimal 2 kali
    if (totalDipilih + jumlah_pengulangan > MAX_PENGULANGAN) {
      return res.status(400).json({
        message: `Kegiatan ini hanya bisa dipilih maksimal ${MAX_PENGULANGAN} kali`
      });
    }
  
    // Tambahkan ke userKegiatan
    userKegiatan.push({
      UserId: userId,
      KegiatanId: kegiatanId,
      jumlah_pengulangan,
      status: 'draft'
    });
  
    res.json({ message: 'Kegiatan berhasil dipilih', data: userKegiatan });
};
// Endpoint untuk submit kegiatan
const submitKegiatan = (req, res) => {
  const userId = 1; // Dummy user ID

  // Ubah status draft menjadi submitted
  userKegiatan.forEach(uk => {
    if (uk.UserId === userId && uk.status === 'draft') {
      uk.status = 'submitted';
    }
  });

  res.json({ message: 'Kegiatan berhasil disubmit', data: userKegiatan });
};

module.exports = { getRekomendasi, pilihKegiatan, submitKegiatan };