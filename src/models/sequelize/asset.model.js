import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const AssetModel = sequelize.define("Asset", {
  inventory_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: { type: DataTypes.STRING(500), allowNull: false },
  brand: { type: DataTypes.STRING(100), allowNull: false },
  model: { type: DataTypes.STRING(100), allowNull: false },
  status: {
    type: DataTypes.ENUM("good", "regular", "bad", "out_of_service"),
    allowNull: false,
    defaultValue: "good",
  },
  acquisition_date: { type: DataTypes.DATE, allowNull: false },
  acquisition_value: { type: DataTypes.DECIMAL, allowNull: false },
});

// TODO: Relación muchos a uno con User (muchos Assets pueden tener un mismo responsable)   --------se creo---
// * 1:N User → Asset (responsible)
// ! FALTA COMPLETAR ACA
AssetModel.belongsTo(UserModel, {
  as: "responsible",
  foreignKey: "responsibleId",
});

// * 'assets' (User) y 'responsible' (Asset)
UserModel.hasMany(AssetModel, {
  as: "assets",
  foreignKey: "responsibleId",
});
