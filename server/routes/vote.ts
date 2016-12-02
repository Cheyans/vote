
import {Router} from "express";
import logger from "../libs/logger";
import {IAuthedRequest} from "../libs/auth";

const router = Router();
const FAF_API = process.env.FAF_API;

router.get("/", async (req, next, next) => {

});

router.post("/", async (req, res, next) => {
  const token = (<IAuthedRequest> req).token;
  const result = await axios.get(`${FAF_API}/players/me`, {headers: {"Authorization": `Bearer ${token}`}});
});

export = router;
