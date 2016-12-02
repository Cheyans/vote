
import {Router} from "express";
import logger from "../libs/logger";
import {IAuthedRequest, permissions} from "../libs/auth/utils";
import survey from "../libs/requestValidation/schemas/survey";

const router = Router();
const FAF_API = process.env.FAF_API;

router.get("/", async (req, res, next) => {

});

router.post("/survey", permissions("admin"), async (req: IAuthedRequest, res, next) => {
});



export = router;
