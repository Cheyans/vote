import * as Joi from "joi";

const survey = Joi.object().keys({
  name: Joi.string().max(256).required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  questions: Joi.array().items(Joi.object().keys({
    question: Joi.string(),
    orderNumber: Joi.number().optional(),
    maxVotesPerUser: Joi.number().optional(),
    minVotesPerUser: Joi.number().optional(),
    answers: Joi.array().items(Joi.object().keys({
      answer: Joi.string().required(),
      orderNumber: Joi.number().optional()
    })).required()
  })).required(),
  bannedUsers: Joi.array().items(Joi.string()).optional(),
  bannedIps: Joi.array().items(Joi.string().ip()).optional()
});

export interface ISurvey {
  name: string;
  startDate?: Date;
  endDate: Date;
  questions: [IQuestion];
  bannedUsers?: [string];
  bannedIps?: [string];
}

export interface IQuestion {
  question: string;
  orderNumber?: number;
  maxVotesPerUser?: number;
  minVotesPerUser?: number;
  answers: [IAnswer];
}

export interface IAnswer {
  answer: string;
  orderNumber?: number;
}
export default survey;
