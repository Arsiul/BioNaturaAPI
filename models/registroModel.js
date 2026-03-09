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

  
  static getTopRegistroByUser(id_user) {
  return new Promise((resolve, reject) => {
    const sql = `
SELECT 
    (SELECT SUM(tb1.cantidad) 
     FROM tb_registro tb1 
     WHERE tb1.id_user = ?) AS total_cantidad,
     
    (SELECT tb2.material
     FROM tb_registro tb1
     INNER JOIN tb_material tb2 ON tb1.id_material = tb2.id
     WHERE tb1.id_user = ?
     GROUP BY tb2.material
     ORDER BY COUNT(*) DESC
     LIMIT 1) AS material,
     
    (SELECT COUNT(*) 
     FROM tb_registro tb1
     WHERE tb1.id_user = ?) AS total_registros;
    `;

    
    db.query(sql, [id_user, id_user, id_user], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
}
}