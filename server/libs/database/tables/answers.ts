import {Table, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm";
import AnswerOptions from "./answerOptions";

@Table("answers")
export default class Answers {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", {name: "user_id", nullable: false})
  userId;

  @JoinColumn({name: "answer_option_id"})
  @ManyToOne((type) => AnswerOptions, (answerOption: AnswerOptions) => answerOption.answer)
  answerOptionId;

  @Column("text")
  response: string;

  @Column("time", {name: "answer_dtm", default: "CURRENT_TIMESTAMP", nullable: false})
  answerDtm;

  @Column("boolean", {name: "valid", default: "TRUE", nullable: false})
  valid;

  @Column("string", {name: "ip", length: 15, nullable: false})
  ip;
}
