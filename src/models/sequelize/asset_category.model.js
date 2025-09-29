import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory. -------se creo -----
// * N:M Asset ↔ Category through AssetCategory
// ! FALTA COMPLETAR ACA
//----------Relaciones-----------
AssetModel.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  as: "categories",
  foreignKey: "assetId",
  otherKey: "categoryId",
});

// * 'categories' (Asset) y 'assets' (Category)
CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  as: "assets",
  foreignKey: "categoryId",
  otherKey: "assetId",
});
