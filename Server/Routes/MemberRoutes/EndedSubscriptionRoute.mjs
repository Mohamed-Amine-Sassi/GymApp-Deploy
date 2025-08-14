import EndedSubscription from "../../Functions/MemberFunctions/EndedSubscriptionFct.mjs";
import { Router } from "express";

const Route = Router();
Route.get("/", EndedSubscription);
export default Route;
