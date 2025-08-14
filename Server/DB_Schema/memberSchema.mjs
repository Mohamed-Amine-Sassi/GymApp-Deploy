import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.String,
    required: true,
  },
  specialty: { type: mongoose.Schema.Types.String, required: true },
  subscriptionDay: { type: mongoose.Schema.Types.String, required: true },
  endSubscriptionDay: { type: mongoose.Schema.Types.String, required: true },
});
export const Member = mongoose.model("Member", memberSchema);
