import { Schema, model, Types } from "mongoose";

// TODO: completar relaciones embebidas y referenciadas

const AssetSchema = new Schema(
  {
    inventoryNumber: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    model: { type: String, required: true, minlength: 2, maxlength: 100 },
    status: {
      type: String,
      enum: ["good", "regular", "bad", "out_of_service"],
      default: "good",
    },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true, min: 0 },

    // Relación 1:1: User - Profile (referencia, si la necesitas)
    profile: { type: Types.ObjectId, ref: "Profile" },

    // Relación 1:N: responsable del asset (User)
    responsible: { type: Types.ObjectId, ref: "User" },

    // Relación N:M: categorías del asset
    categories: [{ type: Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

// Eliminación en cascada
AssetSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await AssetCategoryModel.deleteMany({ asset: doc._id });
  }
  next();
});

export const AssetModel = model("Asset", AssetSchema);

//listo creo
