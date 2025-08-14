import { Router } from "express";
import Refresh from "../../Functions/AuthFunctions/Refresh.mjs";
const Route = Router();

Route.post("/", Refresh);
export default Route;
