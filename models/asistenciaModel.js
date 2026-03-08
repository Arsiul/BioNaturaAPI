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

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT tb1.hora_entrada,tb1.hora_salida, tb2.estado, tb4.distrito FROM tb_asistencia tb1
INNER JOIN tb_estado_asistencia tb2 ON (tb1.id_estado_asistencia = tb2.id)
INNER JOIN tb_zona_asignada tb3 ON (tb1.id_user = tb3.id_user)
INNER JOIN tb_distrito tb4 ON (tb3.id_distrito = tb4.id) WHERE tb1.id_user = ?
ORDER BY tb1.hora_entrada DESC;`,
        [id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }

  static checkPendienteSalida(id_user) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) AS pendiente 
                   FROM tb_asistencia 
                   WHERE id_user = ? AND hora_salida IS NULL`;
      db.query(sql, [id_user], (err, results) => {
        if (err) reject(err);
        else resolve(results[0].pendiente > 0);
      });
    });
  }
  // 🔹 Método actualizado para registrar la salida con hora de Lima
static async updateSalida(id_user) {
  return new Promise((resolve, reject) => {
    try {
      // Hora actual en Lima
      const now = new Date();

      // Obtener componentes según Lima
      const options = { timeZone: "America/Lima", hour12: false };
      const limaDate = new Date(
        now.toLocaleString("en-US", options)
      );

      const yyyy = limaDate.getFullYear();
      const mm = String(limaDate.getMonth() + 1).padStart(2, '0'); // Mes +1
      const dd = String(limaDate.getDate()).padStart(2, '0');
      const hh = String(limaDate.getHours()).padStart(2, '0');
      const mi = String(limaDate.getMinutes()).padStart(2, '0');
      const ss = String(limaDate.getSeconds()).padStart(2, '0');

      const horaSalida = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

      const sql = `
        UPDATE tb_asistencia 
        SET hora_salida = ?
        WHERE id_user = ? AND hora_salida IS NULL
        ORDER BY hora_entrada DESC
        LIMIT 1
      `;

      db.query(sql, [horaSalida, id_user], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}


}