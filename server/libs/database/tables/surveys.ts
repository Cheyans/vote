import {Table, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Questions from "./questions";
import {IQuestion} from "../../schemaValidation/schemas/survey";

@Table("surveys")
export default class Surveys {
  constructor(name: string, questions: IQuestion[], endDtm: Date, startDtm?: Date) {
    this.name = name;
    this.endDtm = endDtm.toUTCString();
    this.startDtm = startDtm ? startDtm.toUTCString() : undefined;
    this.questions = questions.map((question) => {
      return new Questions(question.question, this, question.answers, question.orderNumber, question.multiAnswer);
    });
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column("string", {length: 256, nullable: false})
  name: string;

  @Column("time", {name: "start_dtm", default: "CURRENT_TIMESTAMP", nullable: false})
  startDtm;

  @Column("time", {name: "end_dtm"})
  endDtm;

  @OneToMany((type) => Questions, (question: Questions) => question.survey)
  questions: Questions[];
}
