import renewSubscription from "../../Functions/MemberFunctions/RenewSubscriptionFct.mjs";
import { Router } from "express";

const Route = Router();
Route.patch("/", renewSubscription);
export default Route;
