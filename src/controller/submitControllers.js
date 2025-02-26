import submitModel from '../models/submitModels.js';

const submitData = async (req, res) => {
    const { userId, rhk, rk, totalPoint } = req.body;

    // Validasi input
    if (!userId || !rhk || !rk || !totalPoint) {
        return res.status(400).json({
            status: 'failed',
            message: 'Semua field harus diisi'
        });
    }

    try {
        // Simpan data ke database
        const newDataId = await submitModel.submitData(userId, rhk, rk, totalPoint);

        res.json({
            status: 'success',
            message: 'Data berhasil disimpan',
            data: {
                id: newDataId,
                userId,
                rhk,
                rk,
                totalPoint
            }
        });
    } catch (error) {
        console.error('Submit error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan saat menyimpan data'
        });
    }
}

export default { submitData };