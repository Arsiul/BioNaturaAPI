import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export default class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_user WHERE correo = ?', [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static create(user) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(user.contraseña, 8);
      const sql = `INSERT INTO tb_user 
        (dni, primernombre, segundo_nombre, primer_apellido, segundo_apellido, contraseña, nro_telefono, correo, id_distrito, id_cargo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(sql, [
        user.dni,
        user.primernombre,
        user.segundo_nombre,
        user.primer_apellido,
        user.segundo_apellido,
        hashedPassword,
        user.nro_telefono,
        user.correo,
        user.id_distrito,
        user.id_cargo
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
      `SELECT id_usuario,dni,primernombre,segundo_nombre,primer_apellido,segundo_apellido,nro_telefono,correo,contraseña,distrito,cargo,area,DATE_FORMAT(fecha_registro, '%Y-%m-%d') AS fecha_registro
FROM tb_user tb1
INNER JOIN tb_distrito tb2 ON (tb1.id_distrito = tb2.id)
INNER JOIN tb_cargo tb3 ON (tb1.id_cargo = tb3.id) 
INNER JOIN tb_area tb4 ON (tb3.id_area = tb4.id)
WHERE tb1.id_usuario = ?;`,
      [id],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}
  static getDatesByUserId(id_user) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT tb1.id, tb1.cantidad, tb4.primernombre, tb4.segundo_nombre, tb2.material,tb1.nota, tb3.distrito,tb1.fecha_registro FROM tb_registro tb1 
INNER JOIN tb_material tb2 ON (tb1.id_material = tb2.id)
INNER JOIN tb_distrito tb3 ON (tb1.id_distrito = tb3.id)
INNER JOIN tb_user tb4 ON (tb1.id_user = tb4.id_usuario) WHERE tb1.id_user = ?;
      `;
      db.query(sql, [id_user], (err, results) => {
        if (err) {
          
          reject(err);
          console.error('ERROR SQL:', err);
        }
        else resolve(results);
      });
    });
  }

  static updateProfile(userId, { correo, nro_telefono }) {
  return new Promise((resolve, reject) => {
    // Si queremos actualizar AMBOS o SOLO UNO, construimos la query dinámicamente
    let sql = "UPDATE tb_user SET ";
    let fields = [];
    let values = [];

    if (correo) {
      sql += "correo = ?, ";
      values.push(correo);
    }
    if (nro_telefono) {
      sql += "nro_telefono = ?, ";
      values.push(nro_telefono);
    }

    sql = sql.slice(0, -2);
    sql += " WHERE id_usuario = ?";
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

  static updatePassword(userId, newHashedPassword) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE tb_user SET contraseña = ? WHERE id_usuario = ?`;
    db.query(sql, [newHashedPassword, userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}
}

