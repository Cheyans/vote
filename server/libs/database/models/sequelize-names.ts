////////////////////////////////////////////////////////////////////
//
// GENERATED CLASS
//
// DO NOT EDIT
//
// See sequelize-auto-ts for edits
//
////////////////////////////////////////////////////////////////////

'depends typescript-client-server-compat.js';

import types = require('./sequelize-types');

export interface SequelizeNames {
    TableNames: TableNames;
    calculatedFields:CalculatedFields;
    references:References;
    answerFields:AnswersFields;
    permissionFields:PermissionsFields;
    questionFields:QuestionsFields;
    surveyFields:SurveysFields;
    survey_banned_userFields:SurveyBannedUsersFields;
    userFields:UsersFields;
    voteFields:VotesFields;
}

export class TableNames {
    answers:string = 'answers';
    permissions:string = 'permissions';
    questions:string = 'questions';
    surveys:string = 'surveys';
    survey_banned_users:string = 'survey_banned_users';
    users:string = 'users';
    votes:string = 'votes';
}
export var tableNames:TableNames = new TableNames();

export class AnswersFields {
    id:string = 'id';
    answer:string = 'answer';
    question_id:string = 'question_id';
    display_order:string = 'display_order';
    question:string = 'question';
}
export var answersFields:AnswersFields = new AnswersFields();


export class PermissionsFields {
    id:string = 'id';
    permission:string = 'permission';
}
export var permissionsFields:PermissionsFields = new PermissionsFields();


export class QuestionsFields {
    id:string = 'id';
    question:string = 'question';
    survey_id:string = 'survey_id';
    display_order:string = 'display_order';
    max_votes_per_user:string = 'max_votes_per_user';
    min_votes_per_user:string = 'min_votes_per_user';
    survey:string = 'survey';
}
export var questionsFields:QuestionsFields = new QuestionsFields();


export class SurveysFields {
    id:string = 'id';
    survey_name:string = 'survey_name';
    start_dtm:string = 'start_dtm';
    end_dtm:string = 'end_dtm';
}
export var surveysFields:SurveysFields = new SurveysFields();


export class SurveyBannedUsersFields {
    id:string = 'id';
    survey_id:string = 'survey_id';
    user_id:string = 'user_id';
    survey:string = 'survey';
    user:string = 'user';
}
export var surveyBannedUsersFields:SurveyBannedUsersFields = new SurveyBannedUsersFields();


export class UsersFields {
    id:string = 'id';
    username:string = 'username';
    banned:string = 'banned';
    permission_id:string = 'permission_id';
    permission:string = 'permission';
}
export var usersFields:UsersFields = new UsersFields();


export class VotesFields {
    id:string = 'id';
    user_id:string = 'user_id';
    question_id:string = 'question_id';
    answer_id:string = 'answer_id';
    vote_dtm:string = 'vote_dtm';
    valid:string = 'valid';
    ip:string = 'ip';
    question:string = 'question';
    answer:string = 'answer';
    user:string = 'user';
}
export var votesFields:VotesFields = new VotesFields();


export class CalculatedFields {}
export var calculatedFields:CalculatedFields = new CalculatedFields();

export class References {
    question_id:types.Reference = { tableName: 'questions', primaryKey: 'questionId', foreignKey: 'question_id', as: 'question'};
    survey_id:types.Reference = { tableName: 'surveys', primaryKey: 'surveyId', foreignKey: 'survey_id', as: 'survey'};
    user_id:types.Reference = { tableName: 'users', primaryKey: 'userId', foreignKey: 'user_id', as: 'user'};
    permission_id:types.Reference = { tableName: 'permissions', primaryKey: 'permissionId', foreignKey: 'permission_id', as: 'permission'};
    answer_id:types.Reference = { tableName: 'answers', primaryKey: 'answerId', foreignKey: 'answer_id', as: 'answer'};
}

export var references:References = new References();
