import Registro from '../models/registroModel.js';


export const crearRegistro = async (req, res) => {
  try {
    const { cantidad, nota, id_material, id_user, id_distrito } = req.body;

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


export const getTopRegistro = async (req, res) => {
  try {
    const id_user = req.userId; // Usamos tu middleware

    if (!id_user) return res.status(401).json({ message: "Usuario no autorizado" });

    const top = await Registro.getTopRegistroByUser(id_user);
    if (!top) return res.status(404).json({ message: "No hay registros para este usuario" });

    res.json(top);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener registros", error });
  }
};