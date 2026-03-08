import db from '../config/db.js';

export default class Registro {
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO tb_registro 
        (cantidad, nota, id_material, id_user, id_distrito) 
        VALUES (?, ?, ?, ?, ?)`;

      db.query(sql, [
        data.cantidad,
        data.nota,
        data.id_material,
        data.id_user,
        data.id_distrito
      ], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}