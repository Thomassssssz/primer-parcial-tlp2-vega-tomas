import { UserModel } from "../models/mongoose/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    const {
      username,
      email,
      password,
      role,
      employee_number,
      first_name,
      last_name,
      phone,
    } = req.body;

    //unicidad
    const exists = await UserModel.findOne({
      $or: [
        { username },
        { email },
        { "profile.employee_number": employee_number },
      ],
    });
    if (exists)
      return res.status(400).json({ msg: "Usuario, email o legajo ya existe" });

    const hashedPassword = await hashPassword(password);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile: {
        employee_number,
        first_name,
        last_name,
        phone,
      },
    });

    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || user.deletedAt)
      return res.status(400).json({ msg: "Credenciales inválidas" });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Credenciales inválidas" });

    const token = signToken({ id: user._id, role: user.role });
    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente

    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};

//controladores ya hechos y completado
