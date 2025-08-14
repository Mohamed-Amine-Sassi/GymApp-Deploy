import Login from "../../Functions/AuthFunctions/LoginFct.mjs";
import { Router } from "express";
const Route = Router();

Route.post("/", Login);

export default Route;
