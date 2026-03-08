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