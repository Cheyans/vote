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
import types = require('./sequelize-types');

var Sequelize:sequelize.SequelizeStatic = require('sequelize');

export var initialized:boolean = false;
export var SEQUELIZE:sequelize.Sequelize;

export var AnswersModel:types.AnswersModel;
export var PermissionsModel:types.PermissionsModel;
export var QuestionsModel:types.QuestionsModel;
export var SurveysModel:types.SurveysModel;
export var SurveyBannedUsersModel:types.SurveyBannedUsersModel;
export var UsersModel:types.UsersModel;
export var VotesModel:types.VotesModel;


export function initialize(database:string, username:string, password:string, options:sequelize.Options):any
{
    if (initialized)
    {
        return;
    }

    SEQUELIZE = new Sequelize(database, username, password, options);

    AnswersModel = <types.AnswersModel> SEQUELIZE.define<types.AnswersInstance, types.AnswersPojo>('answer', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'answer': {type: Sequelize.STRING},
        'question_id': {type: Sequelize.INTEGER, allowNull: false},
        'display_order': {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
        },
        {
            classMethods: {
                GetAnswers:(answer:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(answer);
                    if (isNaN(id)) {
                        if (answer['id'] !== undefined) { where['id'] = answer['id']}
                        if (answer['answer'] !== undefined) { where['answer'] = answer['answer']}
                        if (answer['question_id'] !== undefined) { where['question_id'] = answer['question_id']}
                        if (answer['display_order'] !== undefined) { where['display_order'] = answer['display_order']}
                    } else {
                        where['!!cannotFindIdFieldOnanswers!!'] = id;
                    }
                    return AnswersModel.find({where: where});
                }
            }
        });
    
    PermissionsModel = <types.PermissionsModel> SEQUELIZE.define<types.PermissionsInstance, types.PermissionsPojo>('permission', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'permission': {type: Sequelize.STRING, allowNull: false}
        },
        {
            classMethods: {
                GetPermissions:(permission:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(permission);
                    if (isNaN(id)) {
                        if (permission['id'] !== undefined) { where['id'] = permission['id']}
                        if (permission['permission'] !== undefined) { where['permission'] = permission['permission']}
                    } else {
                        where['!!cannotFindIdFieldOnpermissions!!'] = id;
                    }
                    return PermissionsModel.find({where: where});
                }
            }
        });
    
    QuestionsModel = <types.QuestionsModel> SEQUELIZE.define<types.QuestionsInstance, types.QuestionsPojo>('question', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'question': {type: Sequelize.STRING},
        'survey_id': {type: Sequelize.INTEGER, allowNull: false},
        'display_order': {type: Sequelize.INTEGER, allowNull: false, defaultValue: "-1"},
        'max_votes_per_user': {type: Sequelize.INTEGER, allowNull: false, defaultValue: 1},
        'min_votes_per_user': {type: Sequelize.INTEGER, allowNull: false, defaultValue: 1}
        },
        {
            classMethods: {
                GetQuestions:(question:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(question);
                    if (isNaN(id)) {
                        if (question['id'] !== undefined) { where['id'] = question['id']}
                        if (question['question'] !== undefined) { where['question'] = question['question']}
                        if (question['survey_id'] !== undefined) { where['survey_id'] = question['survey_id']}
                        if (question['display_order'] !== undefined) { where['display_order'] = question['display_order']}
                        if (question['max_votes_per_user'] !== undefined) { where['max_votes_per_user'] = question['max_votes_per_user']}
                        if (question['min_votes_per_user'] !== undefined) { where['min_votes_per_user'] = question['min_votes_per_user']}
                    } else {
                        where['!!cannotFindIdFieldOnquestions!!'] = id;
                    }
                    return QuestionsModel.find({where: where});
                }
            }
        });
    
    SurveysModel = <types.SurveysModel> SEQUELIZE.define<types.SurveysInstance, types.SurveysPojo>('survey', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'survey_name': {type: Sequelize.STRING, allowNull: false},
        'start_dtm': {type: Sequelize.DATE, allowNull: false, defaultValue: "CURRENT_TIMESTAMP"},
        'end_dtm': {type: Sequelize.DATE}
        },
        {
            classMethods: {
                GetSurveys:(survey:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(survey);
                    if (isNaN(id)) {
                        if (survey['id'] !== undefined) { where['id'] = survey['id']}
                        if (survey['survey_name'] !== undefined) { where['survey_name'] = survey['survey_name']}
                        if (survey['start_dtm'] !== undefined) { where['start_dtm'] = survey['start_dtm']}
                        if (survey['end_dtm'] !== undefined) { where['end_dtm'] = survey['end_dtm']}
                    } else {
                        where['!!cannotFindIdFieldOnsurveys!!'] = id;
                    }
                    return SurveysModel.find({where: where});
                }
            }
        });
    
    SurveyBannedUsersModel = <types.SurveyBannedUsersModel> SEQUELIZE.define<types.SurveyBannedUsersInstance, types.SurveyBannedUsersPojo>('survey_banned_user', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'survey_id': {type: Sequelize.INTEGER, allowNull: false},
        'user_id': {type: Sequelize.INTEGER, allowNull: false}
        },
        {
            classMethods: {
                GetSurveyBannedUsers:(survey_banned_user:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(survey_banned_user);
                    if (isNaN(id)) {
                        if (survey_banned_user['id'] !== undefined) { where['id'] = survey_banned_user['id']}
                        if (survey_banned_user['survey_id'] !== undefined) { where['survey_id'] = survey_banned_user['survey_id']}
                        if (survey_banned_user['user_id'] !== undefined) { where['user_id'] = survey_banned_user['user_id']}
                    } else {
                        where['!!cannotFindIdFieldOnsurvey_banned_users!!'] = id;
                    }
                    return SurveyBannedUsersModel.find({where: where});
                }
            }
        });
    
    UsersModel = <types.UsersModel> SEQUELIZE.define<types.UsersInstance, types.UsersPojo>('user', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'username': {type: Sequelize.STRING, allowNull: false},
        'banned': {type: Sequelize.BLOB, allowNull: false, defaultValue: "b'0'"},
        'permission_id': {type: Sequelize.INTEGER}
        },
        {
            classMethods: {
                GetUsers:(user:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(user);
                    if (isNaN(id)) {
                        if (user['id'] !== undefined) { where['id'] = user['id']}
                        if (user['username'] !== undefined) { where['username'] = user['username']}
                        if (user['banned'] !== undefined) { where['banned'] = user['banned']}
                        if (user['permission_id'] !== undefined) { where['permission_id'] = user['permission_id']}
                    } else {
                        where['!!cannotFindIdFieldOnusers!!'] = id;
                    }
                    return UsersModel.find({where: where});
                }
            }
        });
    
    VotesModel = <types.VotesModel> SEQUELIZE.define<types.VotesInstance, types.VotesPojo>('vote', {
        'id': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        'user_id': {type: Sequelize.INTEGER, allowNull: false},
        'question_id': {type: Sequelize.INTEGER, allowNull: false},
        'answer_id': {type: Sequelize.INTEGER, allowNull: false},
        'vote_dtm': {type: Sequelize.DATE, allowNull: false, defaultValue: "CURRENT_TIMESTAMP"},
        'valid': {type: Sequelize.BLOB, allowNull: false, defaultValue: "b'1'"},
        'ip': {type: Sequelize.STRING, allowNull: false}
        },
        {
            classMethods: {
                GetVotes:(vote:any) => {
                    var where:{[key:string]:any} = {};
                    var id:number = parseInt(vote);
                    if (isNaN(id)) {
                        if (vote['id'] !== undefined) { where['id'] = vote['id']}
                        if (vote['user_id'] !== undefined) { where['user_id'] = vote['user_id']}
                        if (vote['question_id'] !== undefined) { where['question_id'] = vote['question_id']}
                        if (vote['answer_id'] !== undefined) { where['answer_id'] = vote['answer_id']}
                        if (vote['vote_dtm'] !== undefined) { where['vote_dtm'] = vote['vote_dtm']}
                        if (vote['valid'] !== undefined) { where['valid'] = vote['valid']}
                        if (vote['ip'] !== undefined) { where['ip'] = vote['ip']}
                    } else {
                        where['!!cannotFindIdFieldOnvotes!!'] = id;
                    }
                    return VotesModel.find({where: where});
                }
            }
        });
    
    QuestionsModel.hasMany(AnswersModel, {foreignKey: 'question_id' });
    AnswersModel.belongsTo(QuestionsModel, {as: 'question', foreignKey: 'question_id' });

    
    SurveysModel.hasMany(QuestionsModel, {foreignKey: 'survey_id' });
    QuestionsModel.belongsTo(SurveysModel, {as: 'survey', foreignKey: 'survey_id' });

    
    SurveysModel.hasMany(SurveyBannedUsersModel, {foreignKey: 'survey_id' });
    SurveyBannedUsersModel.belongsTo(SurveysModel, {as: 'survey', foreignKey: 'survey_id' });

    
    UsersModel.hasMany(SurveyBannedUsersModel, {foreignKey: 'user_id' });
    SurveyBannedUsersModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id' });

    
    PermissionsModel.hasMany(UsersModel, {foreignKey: 'permission_id' });
    UsersModel.belongsTo(PermissionsModel, {as: 'permission', foreignKey: 'permission_id' });

    
    QuestionsModel.hasMany(VotesModel, {foreignKey: 'question_id' });
    VotesModel.belongsTo(QuestionsModel, {as: 'question', foreignKey: 'question_id' });

    
    AnswersModel.hasMany(VotesModel, {foreignKey: 'answer_id' });
    VotesModel.belongsTo(AnswersModel, {as: 'answer', foreignKey: 'answer_id' });

    
    UsersModel.hasMany(VotesModel, {foreignKey: 'user_id' });
    VotesModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id' });

    
    return exports;
}
