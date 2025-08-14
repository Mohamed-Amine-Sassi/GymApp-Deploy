import { Member } from "../../DB_Schema/memberSchema.mjs";
import moment from "moment";

const EndedSubscription = async (req, res) => {
  const Today = moment().format("MM-DD-YYYY");
  try {
    const foundMember = await Member.find({
      endSubscriptionDay: { $lt: Today },
    });

    if (foundMember.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(foundMember);
  } catch (err) {
    console.log("err in when getting ended members:", err);
    return res.status(400).send("err in when getting ended members:");
  }
};

export default EndedSubscription;
