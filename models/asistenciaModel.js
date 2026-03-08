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
      // 'SELECT id_usuario, dni, primernombre, segundo_nombre, primer_apellido, segundo_apellido, correo, nro_telefono, id_distrito, id_cargo FROM tb_user WHERE id_usuario = ?',
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
}
