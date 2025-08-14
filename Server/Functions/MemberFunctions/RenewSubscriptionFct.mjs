import { Member } from "../../DB_Schema/memberSchema.mjs";
import moment from "moment";
async function renewSubscription(req, res) {
  const { firstName, lastName, dateOfBirth, phoneNumber } = req.body;
  try {
    const subscriptionDay = moment().format("MM-DD-YYYY");
    const endSubscriptionDay = moment().add(1, "month").format("MM-DD-YYYY");

    const foundMember = await Member.findOneAndUpdate(
      {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
      },
      {
        subscriptionDay: subscriptionDay,
        endSubscriptionDay: endSubscriptionDay,
      }
    );
    if (!foundMember) {
      return res.sendStatus(400);
    } else {
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log("fama mochkla:", err);
    return res.sendStatus(400);
  }
}
export default renewSubscription;
