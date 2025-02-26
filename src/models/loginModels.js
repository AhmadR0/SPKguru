import pool from '../config/db.js';


   export async function getUser(username,password){
        try{
            const [rows] = await pool.query('SELECT * FROM user WHERE userName = ? AND password = ?',[username,password]
            );
            return rows[0];
        }
        catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }


