import { NbreOfMembers } from "../../Functions/MemberFunctions/NbreOfMembers.mjs";
import { Router } from "express";

const Route = Router();
Route.get("/", NbreOfMembers);
export default Route;
