import Asistencia from '../models/asistenciaModel.js';
export const crearAsistencia = async (req, res) => {
  try {
    const { hora_entrada,id_user,id_estado_asistencia } = req.body;

    // Validación simple
    if (!hora_entrada || !id_user || !id_estado_asistencia) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    await Asistencia.createAsistencia({ hora_entrada,id_user,id_estado_asistencia });
    
    res.status(201).json({ message: "Asistencia Registrada Correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la asistencia", error });
  }
};
export const getAsistenciaById = async (req, res) => {
  try {
    const userId = req.userId; // JWT

    // Usamos directamente el método del modelo User
    const registros = await Asistencia.findById(userId);

    if (!registros || registros.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron registros para este usuario' });
    }

    res.json(registros);
  } catch (err) {
    console.error('Error al obtener registros:', err);
    res.status(500).json({ msg: 'Error al obtener los registros del usuario' });
  }
};

// controllers/asistenciaController.js
export const marcarSalida = async (req, res) => {
    try {
        const { id_user } = req.body;

        // Actualizar la última asistencia del usuario que no tenga hora_salida
        await Asistencia.updateSalida(id_user);

        res.status(200).json({ message: "Hora de salida registrada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar la salida", error });
    }
};

export const verificarPendiente = async (req, res) => {
  try {
    const idUser = req.userId; // Esto viene de tu middleware verifyToken
    const pendiente = await Asistencia.checkPendienteSalida(idUser);
    res.json({ pendienteSalida: pendiente });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al verificar asistencia' });
  }
};