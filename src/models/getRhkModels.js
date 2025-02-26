import pool from '../config/db.js';

export async function getResultrhk(iduser){
    console.log(iduser);
    try{
        const [rows] = await pool.query('SELECT * FROM userResult WHERE user_id = ?', [iduser]);
        return rows;
    }
    catch (error) {
        console.error('Error fetching rhk:', error);
        throw error;
    }
}