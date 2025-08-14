import { Member } from "../../DB_Schema/memberSchema.mjs";

const DeleteSubscription = async (req, res) => {
  const { firstName, lastName, dateOfBirth, phoneNumber } = req.body;
  try {
    const foundMember = await Member.findOneAndDelete({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
    });
    if (!foundMember) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  } catch (err) {
    console.log("Fama 7aja Ma Mchetch !");
  }
};
export default DeleteSubscription;
