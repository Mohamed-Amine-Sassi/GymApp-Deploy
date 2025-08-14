import getAllMembers from "../../Functions/MemberFunctions/GetAllMembersFct.mjs";
import { Router } from "express";

const Route = Router();
Route.get("/", getAllMembers);
export default Route;
