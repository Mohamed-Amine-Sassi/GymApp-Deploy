import { Member } from "../../DB_Schema/memberSchema.mjs";
import moment from "moment";
export const NbreOfMembers = async (req, res) => {
  const result = await Member.countDocuments();
  return res.status(200).json(result);
};

export const NbreOfEndedSubMembers = async (req, res) => {
  const Today = moment().format("MM-DD-YYYY");
  const data = await Member.find({
    endSubscriptionDay: { $lt: Today },
  });
  const result = data.length;
  return res.status(200).json(result);
};
