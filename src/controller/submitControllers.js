import submitModel from '../models/submitModels.js';

const submitData = async (req, res) => {
    const dataArray = req.body;

    // Validasi input
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return res.status(400).json({
            status: 'failed',
            message: 'Data harus berupa array dan tidak boleh kosong'
        });
    }

    try {
        // Simpan data ke database
        const results = await submitModel.submitData(dataArray);

        res.json({
            status: 'success',
            message: 'Data berhasil disimpan',
            data: results
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