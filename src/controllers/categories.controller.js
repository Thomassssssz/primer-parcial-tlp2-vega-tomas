import { CategoryModel } from "../models/mongoose/category.model.js";
import { AssetModel } from "../models/mongoose/asset.model.js";

export const createCategory = async (req, res) => {
  try {
    // TODO: crear category (solo admin)
    const { name, description } = req.body;

    //unicidad
    const exists = await CategoryModel.findOne({ name });
    if (exists) return res.status(400).json({ msg: "La categoría ya existe" });

    const category = await CategoryModel.create({ name, description });
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.find().populate("assets");
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ msg: "Categoría no encontrada" });
    await AssetCategoryModel.deleteMany({ category: id });
    await AssetModel.updateMany(
      { categories: id },
      { $pull: { categories: id } }
    );
    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
