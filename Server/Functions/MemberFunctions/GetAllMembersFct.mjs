import { Member } from "../../DB_Schema/memberSchema.mjs";

const getAllMembers = async (req, res) => {
  try {
    const AllMembers = await Member.find();
    if (!AllMembers) {
      return res.status(200).send("No Members Yet!");
    } else {
      return res.status(200).json(AllMembers);
    }
  } catch (err) {
    console.log("err in when getting all members:", err);
    return res.status(400).send("err in when getting all members:");
  }
};
export default getAllMembers;
