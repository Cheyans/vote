////////////////////////////////////////////////////////////////////
//
// GENERATED CLASS
//
// DO NOT EDIT
//
// See sequelize-auto-ts for edits
//
////////////////////////////////////////////////////////////////////

/// <reference path="../customTypings/client-oauth2/index.d.ts" />

import sequelize = require('sequelize');
import types = require('./sequelize-types'); // important so we can use same fully qualified names in all generated files


var asserters:{[typeName:string]:(pojo:any, allowUndefined?:boolean) => void} = {};

//////////////////////////////////////////////////////////////////////////////
//
//
//               answers
//
//
//////////////////////////////////////////////////////////////////////////////


export interface AnswersPojo
{
    id?:number;
    answer?:string;
    question_id:number;
    display_order?:boolean;
    question?:QuestionsPojo;
}

export interface AnswersInstance extends sequelize.Instance<AnswersPojo>, AnswersPojo { }

export interface AnswersModel extends sequelize.Model<AnswersInstance, AnswersPojo> { }

export function AssertValidAnswers(pojo:AnswersPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid answer provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid answer provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('answer', 'id', pojo, 'number'); break;
            case 'answer': assertValidFieldType('answer', 'answer', pojo, 'string'); break;
            case 'question_id': assertValidFieldType('answer', 'question_id', pojo, 'number'); break;
            case 'display_order': assertValidFieldType('answer', 'display_order', pojo, 'boolean'); break;
            case 'question': assertValidFieldType('answer', 'question', pojo, 'QuestionsPojo'); break;
            default:
                throw new Error('Invalid answer provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['answer'] = AssertValidAnswers;





//////////////////////////////////////////////////////////////////////////////
//
//
//               permissions
//
//
//////////////////////////////////////////////////////////////////////////////


export interface PermissionsPojo
{
    id?:number;
    permission:string;
}

export interface PermissionsInstance extends sequelize.Instance<PermissionsPojo>, PermissionsPojo { }

export interface PermissionsModel extends sequelize.Model<PermissionsInstance, PermissionsPojo> { }

export function AssertValidPermissions(pojo:PermissionsPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid permission provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid permission provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('permission', 'id', pojo, 'number'); break;
            case 'permission': assertValidFieldType('permission', 'permission', pojo, 'string'); break;
            default:
                throw new Error('Invalid permission provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['permission'] = AssertValidPermissions;





//////////////////////////////////////////////////////////////////////////////
//
//
//               questions
//
//
//////////////////////////////////////////////////////////////////////////////


export interface QuestionsPojo
{
    id?:number;
    question?:string;
    survey_id:number;
    display_order?:number;
    max_votes_per_user?:number;
    min_votes_per_user?:number;
    survey?:SurveysPojo;
}

export interface QuestionsInstance extends sequelize.Instance<QuestionsPojo>, QuestionsPojo { }

export interface QuestionsModel extends sequelize.Model<QuestionsInstance, QuestionsPojo> { }

export function AssertValidQuestions(pojo:QuestionsPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid question provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid question provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('question', 'id', pojo, 'number'); break;
            case 'question': assertValidFieldType('question', 'question', pojo, 'string'); break;
            case 'survey_id': assertValidFieldType('question', 'survey_id', pojo, 'number'); break;
            case 'display_order': assertValidFieldType('question', 'display_order', pojo, 'number'); break;
            case 'max_votes_per_user': assertValidFieldType('question', 'max_votes_per_user', pojo, 'number'); break;
            case 'min_votes_per_user': assertValidFieldType('question', 'min_votes_per_user', pojo, 'number'); break;
            case 'survey': assertValidFieldType('question', 'survey', pojo, 'SurveysPojo'); break;
            default:
                throw new Error('Invalid question provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['question'] = AssertValidQuestions;





//////////////////////////////////////////////////////////////////////////////
//
//
//               surveys
//
//
//////////////////////////////////////////////////////////////////////////////


export interface SurveysPojo
{
    id?:number;
    survey_name:string;
    start_dtm?:Date;
    end_dtm?:Date;
}

export interface SurveysInstance extends sequelize.Instance<SurveysPojo>, SurveysPojo { }

export interface SurveysModel extends sequelize.Model<SurveysInstance, SurveysPojo> { }

export function AssertValidSurveys(pojo:SurveysPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid survey provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid survey provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('survey', 'id', pojo, 'number'); break;
            case 'survey_name': assertValidFieldType('survey', 'survey_name', pojo, 'string'); break;
            case 'start_dtm': assertValidFieldType('survey', 'start_dtm', pojo, 'Date'); break;
            case 'end_dtm': assertValidFieldType('survey', 'end_dtm', pojo, 'Date'); break;
            default:
                throw new Error('Invalid survey provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['survey'] = AssertValidSurveys;





//////////////////////////////////////////////////////////////////////////////
//
//
//               survey_banned_users
//
//
//////////////////////////////////////////////////////////////////////////////


export interface SurveyBannedUsersPojo
{
    id?:number;
    survey_id:number;
    user_id:number;
    survey?:SurveysPojo;
    user?:UsersPojo;
}

export interface SurveyBannedUsersInstance extends sequelize.Instance<SurveyBannedUsersPojo>, SurveyBannedUsersPojo { }

export interface SurveyBannedUsersModel extends sequelize.Model<SurveyBannedUsersInstance, SurveyBannedUsersPojo> { }

export function AssertValidSurveyBannedUsers(pojo:SurveyBannedUsersPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid survey_banned_user provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid survey_banned_user provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('survey_banned_user', 'id', pojo, 'number'); break;
            case 'survey_id': assertValidFieldType('survey_banned_user', 'survey_id', pojo, 'number'); break;
            case 'user_id': assertValidFieldType('survey_banned_user', 'user_id', pojo, 'number'); break;
            case 'survey': assertValidFieldType('survey_banned_user', 'survey', pojo, 'SurveysPojo'); break;
            case 'user': assertValidFieldType('survey_banned_user', 'user', pojo, 'UsersPojo'); break;
            default:
                throw new Error('Invalid survey_banned_user provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['survey_banned_user'] = AssertValidSurveyBannedUsers;





//////////////////////////////////////////////////////////////////////////////
//
//
//               users
//
//
//////////////////////////////////////////////////////////////////////////////


export interface UsersPojo
{
    id?:number;
    username:string;
    banned?:Buffer;
    permission_id?:number;
    permission?:PermissionsPojo;
}

export interface UsersInstance extends sequelize.Instance<UsersPojo>, UsersPojo { }

export interface UsersModel extends sequelize.Model<UsersInstance, UsersPojo> { }

export function AssertValidUsers(pojo:UsersPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid user provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid user provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('user', 'id', pojo, 'number'); break;
            case 'username': assertValidFieldType('user', 'username', pojo, 'string'); break;
            case 'banned': assertValidFieldType('user', 'banned', pojo, 'Buffer'); break;
            case 'permission_id': assertValidFieldType('user', 'permission_id', pojo, 'number'); break;
            case 'permission': assertValidFieldType('user', 'permission', pojo, 'PermissionsPojo'); break;
            default:
                throw new Error('Invalid user provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['user'] = AssertValidUsers;





//////////////////////////////////////////////////////////////////////////////
//
//
//               votes
//
//
//////////////////////////////////////////////////////////////////////////////


export interface VotesPojo
{
    id?:number;
    user_id:number;
    question_id:number;
    answer_id:number;
    vote_dtm?:Date;
    valid?:Buffer;
    ip:string;
    question?:QuestionsPojo;
    answer?:AnswersPojo;
    user?:UsersPojo;
}

export interface VotesInstance extends sequelize.Instance<VotesPojo>, VotesPojo { }

export interface VotesModel extends sequelize.Model<VotesInstance, VotesPojo> { }

export function AssertValidVotes(pojo:VotesPojo, allowUndefined?:boolean):void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error('Invalid vote provided. It is \'' + (typeof pojo) + '\'.');
    }
    var fieldNames:string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error('Invalid vote provided. It is an empty object.');
    }

    var i:number = fieldNames.length;
    while(i-- > 0) {
        switch(fieldNames[i]) {
            case 'id': assertValidFieldType('vote', 'id', pojo, 'number'); break;
            case 'user_id': assertValidFieldType('vote', 'user_id', pojo, 'number'); break;
            case 'question_id': assertValidFieldType('vote', 'question_id', pojo, 'number'); break;
            case 'answer_id': assertValidFieldType('vote', 'answer_id', pojo, 'number'); break;
            case 'vote_dtm': assertValidFieldType('vote', 'vote_dtm', pojo, 'Date'); break;
            case 'valid': assertValidFieldType('vote', 'valid', pojo, 'Buffer'); break;
            case 'ip': assertValidFieldType('vote', 'ip', pojo, 'string'); break;
            case 'question': assertValidFieldType('vote', 'question', pojo, 'QuestionsPojo'); break;
            case 'answer': assertValidFieldType('vote', 'answer', pojo, 'AnswersPojo'); break;
            case 'user': assertValidFieldType('vote', 'user', pojo, 'UsersPojo'); break;
            default:
                throw new Error('Invalid vote provided. Field \'' + fieldNames[i] + '\' is not supported.')
        }
    }
}
asserters['vote'] = AssertValidVotes;





var BOOLEAN_TYPE:string = typeof(true);
var NUMBER_TYPE:string = typeof(1);
var STRING_TYPE:string = typeof('');
var FUNCTION_TYPE:string = typeof(function() {});
var DATE_EXPECTED_TYPE:string = 'Date';
var BUFFER_EXPECTED_TYPE:string = 'Buffer';
var BUFFER_EXISTS:boolean = typeof Buffer !== 'undefined'; //in node exists, in js not, so only validate in node

function assertValidFieldType(pojoName:string, fieldName:string, pojo:any, expectedType:string):void {

    var value:any = pojo[fieldName];
    var actualType:string = typeof value;

    if (value === undefined || value === null) {
        return;
    }

    switch(expectedType) {
        case BOOLEAN_TYPE:
            if (actualType !== BOOLEAN_TYPE && actualType !== NUMBER_TYPE) {
                err();
            }
            pojo[fieldName] = Boolean(value);
            return;

        case NUMBER_TYPE:
            if (actualType === NUMBER_TYPE) {
                return;
            }
            if (actualType === STRING_TYPE) {
                var newValue:number = parseFloat(value);
                if (isNaN(newValue)) {
                    err();
                }
                pojo[fieldName] = newValue;
            }
            return;

        case STRING_TYPE:
            if (actualType !== STRING_TYPE) {
                pojo[fieldName] = value.toString();
            }
            return;

        case DATE_EXPECTED_TYPE:
            var getTime:Function = value.getTime;
            if (typeof getTime === FUNCTION_TYPE) {
                var timeValue:number = value.getTime();
                if (isNaN(timeValue)){
                    err();
                }
                if (!(value instanceof Date)) {
                    pojo[fieldName] = new Date(timeValue);
                }
                return;
            }

            if (actualType === STRING_TYPE) {
                var newDate:Date = new Date(value);
                if (!isNaN(newDate.getTime())) {
                    pojo[fieldName] = newDate;
                    return;
                }
            }
            err();
            return;

        case BUFFER_EXPECTED_TYPE:
            if (!BUFFER_EXISTS) {
                return;
            }

            if (!(value instanceof Buffer)) {
                err();
            }
            return;
    }

    // one pojo of array of array of pojos?
    if (expectedType.length > 3 && expectedType.substr(expectedType.length - 2, 2) === '[]') {
        var individualPojoType:string = expectedType.substr(0, expectedType.length - 6);

        var asserter:Function = asserters[individualPojoType];
        if (typeof asserter !== FUNCTION_TYPE) {
            err();
        }

        if (isNaN(value.length)) {
            err();
        }
        for(var i:number = 0; i<value.length; i++) {
            try {
                asserter(value[i], true);
            } catch(e) {
                err('Error at index \'' + i + '\': ' + e.message);
            }
        }

        // all instances valid
        return;
    }

    var asserter:Function = asserters[expectedType.substr(0, expectedType.length - 4)];
    if (typeof asserter !== FUNCTION_TYPE) {
        expectedTypeErr();
    }

    try {
        asserter(value, true);
    } catch(e) {
        err(e.message);
    }

    function err(extraMessage?:string):void {
        var message:string = 'Invalid ' + pojoName + ' provided. Field \'' + fieldName + '\' with value \'' + safeValue(value) + '\' is not a valid \'' + expectedType + '\'.';
        if (extraMessage !== undefined) {
            message += ' ' + extraMessage;
        }
        throw new Error(message);
    }

    function expectedTypeErr():void {
        throw new Error('Cannot validate \'' + pojoName + '\' field \'' + fieldName + '\' since expected type provided \'' + expectedType + '\' is not understood.');
    }
}

function safeValue(value:any):string {

    if (value === undefined || value === null) {
        return typeof value;
    }

    var s:string = value.toString();
    return s.substr(0, 100);
}

export interface Reference {
    tableName:string;
    primaryKey:string;
    foreignKey:string;
    as:string;
}
