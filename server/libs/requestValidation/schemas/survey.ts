import * as Joi from "joi";

const survey = Joi.object().keys({
  name: Joi.string().alphanum().max(256).required(),
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
  bannedUsers: Joi.array().items(Joi.number())
});

export default survey;