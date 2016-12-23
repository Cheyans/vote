import {Table, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import Surveys from "./surveys";
import AnswerOptions from "./answerOptions";
import {IAnswerOptions} from "../../schemaValidation/schemas/survey";

@Table("questions")
export default class Questions {
  constructor(question: string, survey: Surveys, answers: IAnswerOptions[], orderNumber?: number,
              multiAnswer?: boolean) {
    this.question = question;
    this.survey = survey;
    this.answerOptions = answers.map((answer) => {
      return new AnswerOptions(answer.answer, this, answer.openResponse, answer.orderNumber);
    });
    this.orderNumber = orderNumber;
    this.multiAnswer = multiAnswer;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", {nullable: false})
  question: string;

  @Column("smallint", {name: "order_number"})
  orderNumber: number;

  @Column("boolean", {name: "multi_answer"})
  multiAnswer: boolean;

  @JoinColumn({name: "survey_id"})
  @ManyToOne((type) => Surveys, (survey) => survey.questions)
  survey: Surveys;

  @OneToMany((type) => AnswerOptions, (answerOptions: AnswerOptions) => answerOptions.question)
  answerOptions: AnswerOptions[];
}
