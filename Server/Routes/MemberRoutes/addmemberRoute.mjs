import registerMember from "../../Functions/MemberFunctions/RegisterMemberFct.mjs";
import { Router } from "express";
const Route = Router();
Route.post("/", registerMember);
export default Route;
