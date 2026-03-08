import db from '../config/db.js';

export default class Asistencia {
  static createAsistencia(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO tb_asistencia (hora_entrada,id_user,id_estado_asistencia) VALUES
(?,?, ?);`;

      db.query(sql, [
        data.hora_entrada,
        data.id_user,
        data.id_estado_asistencia
      ], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}