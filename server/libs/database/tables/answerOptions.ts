import {Table, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import Questions from "./questions";
import Answers from "./answers";

@Table("answers")
export default class AnswerOptions {
  constructor(answer: string, question: Questions, openResponse?: boolean, orderNumber?: number) {
    this.answer = answer;
    this.question = question;
    this.openResponse = openResponse;
    this.orderNumber = orderNumber;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", {nullable: false})
  answer: string;

  @JoinColumn({name: "question_id"})
  @ManyToOne((type) => Questions, (question: Questions) => question.answerOptions)
  question: Questions;

  @Column("boolean", {name: "open_response", nullable: false, default: "FALSE"})
  openResponse: boolean;

  @Column("smallint", {name: "order_number"})
  orderNumber: number;

  @OneToMany((type) => Answers, (answer: Answers) => answer.answerOptionId)
  answers: Answers;
}
