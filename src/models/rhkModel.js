import pool from '../config/db.js';

export async function getRhk(){
    try{
        const [rows] = await pool.query('SELECT * FROM rhk');
        return rows;
    }
    catch (error) {
        console.error('Error fetching rhk:', error);
        throw error;
    }
}
