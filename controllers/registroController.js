import Registro from '../models/registroModel.js';
export const crearRegistro = async (req, res) => {
  try {
    const { cantidad, nota, id_material, id_user, id_distrito } = req.body;

    // Validación simple
    if (!cantidad || !id_material || !id_user || !id_distrito) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    await Registro.create({ cantidad, nota, id_material, id_user, id_distrito });
    
    res.status(201).json({ message: "Material registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el material", error });
  }
};