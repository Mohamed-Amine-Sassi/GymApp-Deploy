import DeleteSubscription from "../../Functions/MemberFunctions/DeleteSubscriptionFct.mjs";
import { Router } from "express";

const Route = Router();
Route.patch("/", DeleteSubscription);
export default Route;
