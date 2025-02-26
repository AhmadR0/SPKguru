module.exports = {
    users: [
      { id: 1, username: 'guru1', password: 'password1', role: 'guru' }
    ],
    
    sasaran: [
      { id: 1, kode: 'SK1', deskripsi: 'Meningkatkan kompetensi mengajar', poin: 10 },
      { id: 2, kode: 'SK2', deskripsi: 'Pengembangan bahan ajar', poin: 8 },
      { id: 3, kode: 'SK3', deskripsi: 'Penelitian tindakan kelas', poin: 12 }
    ],
    
    kegiatan: [
      { id: 1, nama: 'Workshop Metode Mengajar', deskripsi: '...', poin: 5, sasaran_id: 1 },
      { id: 2, nama: 'Membuat Modul Ajar', deskripsi: '...', poin: 8, sasaran_id: 2 },
      { id: 3, nama: 'Pelatihan PTK', deskripsi: '...', poin: 12, sasaran_id: 3 },
      { id: 4, nama: 'Seminar Pendidikan', deskripsi: '...', poin: 6, sasaran_id: 1 },
      { id: 5, nama: 'Pembuatan Media Pembelajaran', deskripsi: '...', poin: 7, sasaran_id: 2 },
      { id: 6, nama: 'Lokakarya Kurikulum', deskripsi: '...', poin: 9, sasaran_id: 1 },
      { id: 7, nama: 'Pelatihan Teknologi Pendidikan', deskripsi: '...', poin: 10, sasaran_id: 3 }
    ],
    
    userKegiatan: [] // Untuk menyimpan kegiatan yang dipilih user
  };