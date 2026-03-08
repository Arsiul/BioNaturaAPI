import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// LOGIN con correo
export const login = async (req, res) => {
  console.log("BODY RECIBIDO:", req.body);
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) return res.status(400).json({ msg: 'Faltan datos' });

    const users = await User.findByEmail(correo);
    if (users.length === 0) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const user = users[0];
    const passwordIsValid = bcrypt.compareSync(contraseña, user.contraseña);
    if (!passwordIsValid) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id_usuario, correo: user.correo },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// REGISTRAR usuario
export const register = async (req, res) => {
  try {
    const { dni, primernombre, segundo_nombre, primer_apellido, segundo_apellido, contraseña, nro_telefono, correo, id_distrito, id_cargo } = req.body;
    if (!dni || !primernombre || !primer_apellido || !contraseña || !correo)
      return res.status(400).json({ msg: 'Faltan datos obligatorios' });

    const existing = await User.findByEmail(correo);
    if (existing.length > 0) return res.status(400).json({ msg: 'Correo ya registrado' });

    await User.create({ dni, primernombre, segundo_nombre, primer_apellido, segundo_apellido, contraseña, nro_telefono, correo, id_distrito, id_cargo });
    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// OBTENER PERFIL DEL USUARIO
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const users = await User.findById(userId);
    if (users.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// OBTENER REGISTROS DEL USUARIO
export const getDatesByUser = async (req, res) => {
  try {
    const userId = req.userId; // JWT
    console.log('USER ID DEL JWT:', userId);

    // Usamos directamente el método del modelo User
    const registros = await User.getDatesByUserId(userId);

    if (!registros || registros.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron registros para este usuario' });
    }

    res.json(registros);
  } catch (err) {
    console.error('Error al obtener registros:', err);
    res.status(500).json({ msg: 'Error al obtener los registros del usuario' });
  }
};