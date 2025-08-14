import { NbreOfEndedSubMembers } from "../../Functions/MemberFunctions/NbreOfMembers.mjs";
import { Router } from "express";

const Route = Router();
Route.get("/", NbreOfEndedSubMembers);
export default Route;
