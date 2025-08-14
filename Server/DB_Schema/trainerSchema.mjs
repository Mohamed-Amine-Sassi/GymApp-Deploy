import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },

  dateOfBirth: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
});
export const Trainer = mongoose.model("Trainer", trainerSchema);
