import registerAdmin from "../../Functions/AdminFunctions/RegisterAdminFct.mjs";
import { Router } from "express";
const Route = Router();

Route.post("/", registerAdmin);

export default Route;
