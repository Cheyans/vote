
import {Router, Response, NextFunction} from "express";
import {permissions} from "../libs/auth/utils";
import survey from "../libs/schemaValidation/schemas/survey";
import schemaValidator from "../libs/schemaValidation/middleware";
import {IAuthedSchemaRequest} from "../libs/schemaValidation/types";
import {ISurvey} from "../libs/schemaValidation/schemas/survey";
import {insertSurvey} from "../libs/database/accessor";
import authMiddleware from "../libs/auth/middleware";
import Database from "../libs/database/database";
import Surveys from "../libs/database/tables/surveys";

const router = Router();

router.post("/",
  authMiddleware,
  permissions("admin"),
  schemaValidator<ISurvey>(survey),
  async (req: IAuthedSchemaRequest<ISurvey>, res: Response, next: NextFunction) => {
    try {
      const database: Database = await Database.getInstance();
      const survey = req.schema;
      await database.connection.entityManager.transaction((entityManager) => {
        let survey = new Surveys(survey.name, survey.questions, survey.endDate, survey.startDate);
      });
      const surveyId = await insertSurvey(req.schema);
      res.send(Object.assign({}, surveyId, {message: "Successfully created survey"}));
    } catch (e) {
      next(e);
    }
  }
);

export = router;
