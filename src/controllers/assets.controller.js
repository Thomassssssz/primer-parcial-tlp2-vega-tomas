import { AssetModel } from "../models/mongoose/asset.model.js";
import { UserModel } from "../models/mongoose/user.model.js";

export const createAsset = async (req, res) => {
  try {
    // TODO: crear asset (usuario autenticado)
    const {
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      categories,
    } = req.body;

    //unicidad
    const exists = await AssetModel.findOne({ inventoryNumber });
    if (exists)
      return res.status(400).json({ msg: "El número de inventario ya existe" });

    //verifico que exista la categoria

    const asset = await AssetModel.create({
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      responsible: req.user.id,
      categories,
    });
    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const assets = await AssetModel.find()
      .populate("responsible", "-password")
      .populate("categories");
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const myAssets = await AssetModel.find({
      responsible: req.user.id,
    }).populate("categories");
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    const { id } = req.params;
    const asset = await AssetModel.findById(id);
    if (!asset) return res.status(404).json({ msg: "Asset no encontrado" });
    if (asset.responsible.toString() !== req.user.id)
      return res
        .status(403)
        .json({ msg: "No tienes permisos para eliminar este asset" });

    await AssetModel.findByIdAndDelete(id);

    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

//controlador listuki
