import pool from '../config/db.js';

export default {
    async submitData(dataArray) {
        try {
            // Siapkan query untuk batch insert
            const values = dataArray.map(data => [
                data.user_id,
                data.rhk,
                data.rk,
                data.total_point
            ]);

            const [result] = await pool.query(
                'INSERT INTO userResult (user_id, rhk, rk, total_point) VALUES ?',
                [values]
            );

            return result; // Kembalikan hasil query
        } catch (error) {
            console.error('Error submitting data:', error);
            throw error;
        }
    }
}