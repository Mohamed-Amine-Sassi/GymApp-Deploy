import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },

  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
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
export const Admin = mongoose.model("Admin", adminSchema);
