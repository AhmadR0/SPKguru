import pool from '../config/db.js';

export default {
    async submitData(userId, rhk, rk, totalPoint) {
        try {
            const [result] = await pool.query(
                'INSERT INTO  userResult (user_id, rhk, rk, total_point) VALUES (?, ?, ?, ?)',
                [userId, rhk, rk, totalPoint]
            );
            return result.insertId; // Mengembalikan ID data yang baru disimpan
        } catch (error) {
            console.error('Error submitting data:', error);
            throw error;
        }
    }
}