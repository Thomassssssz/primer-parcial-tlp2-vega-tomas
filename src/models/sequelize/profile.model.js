import { DataTypes } from "sequelize";

export const ProfileModel = sequelize.define("Profile", {
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
});

// TODO: Relación uno a uno con User (1 User tiene 1 Profile)  --------se creo-----
// * 1:1 Profile ↔ User
// ! FALTA COMPLETAR ACA

ProfileModel.belongsTo(UserModel, {
  as: "user",
  foreignKey: "userId",
  unique: true,
});

// * 'profile' (User) y 'user' (Profile)

UserModel.hasOne(ProfileModel, {
  as: "profile",
  foreignKey: "userId",
  unique: true,
});
