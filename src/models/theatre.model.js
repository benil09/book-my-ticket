import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    city: { type: String, required: true },
    address: { type: String, required: true },
    PIN: { type: Number , required: true },
    numberOfScreens: { type: Number, required: true },
    screens: [
      {
        screenNumber: { type: Number, required: true },
        seatingCapacity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

export default Theatre;