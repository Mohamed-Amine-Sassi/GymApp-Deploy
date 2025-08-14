import moment from "moment/moment.js";
import { Member } from "../../DB_Schema/memberSchema.mjs";
const registerMember = (req, res) => {
  const { firstName, lastName, phoneNumber, dateOfBirth, specialty } = req.body;

  const subscriptionDay = moment().format("MM-DD-YYYY");
  const endSubscriptionDay = moment().add(1, "month").format("MM-DD-YYYY");

  const newMember = new Member({
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    specialty,
    subscriptionDay,
    endSubscriptionDay,
  });
  newMember
    .save()
    .then(console.log("Member Saved"))
    .catch((err) => {
      console.log(err);
    });
};
export default registerMember;
