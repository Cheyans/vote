import * as Joi from "joi";

const survey = Joi.object().keys({
  name: Joi.string().max(256).required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  questions: Joi.array().items(Joi.object().keys({
    question: Joi.string(),
    multiAnswer: Joi.boolean().optional(),
    orderNumber: Joi.number().optional(),
    answerOptions: Joi.array().items(Joi.object().keys({
      answer: Joi.string().required(),
      openResponse: Joi.boolean().optional(),
      orderNumber: Joi.number().optional()
    })).required()
  })).required()
});

export interface ISurvey {
  name: string;
  startDate?: Date;
  endDate: Date;
  questions: [IQuestion];
}

export interface IQuestion {
  question: string;
  multiAnswer?: boolean;
  orderNumber?: number;
  answers: IAnswerOptions[];
}

export interface IAnswerOptions {
  answer: string;
  openResponse: boolean;
  orderNumber?: number;
}

export default survey;
