import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },
    // ! FALTA COMPLETAR ACA

    //----embebido----
    profile: {
      employee_number: {
        type: String,
        unique: true,
        required: true,
      },
      firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
      lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
      phone: {
        type: String,
      },
    },

    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
// Virtual para populate inverso
UserSchema.virtual("assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "responsible",
});

export const UserModel = model("User", UserSchema);

//listo creo
