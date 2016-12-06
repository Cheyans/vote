DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS survey_banned_ips;
DROP TABLE IF EXISTS survey_banned_users;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS permissions;

CREATE TABLE permissions (
  id INTEGER NOT NULL AUTO_INCREMENT,
  permission VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO permissions (id, permission) VALUES (1, 'none');

CREATE TABLE surveys (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(256) NOT NULL,
  start_dtm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_dtm TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT end_dtm_gt_start_dtm CHECK (start_dtm >= end_dtm),
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id INTEGER NOT NULL,
  username VARCHAR(60) NOT NULL,
  banned TINYINT NOT NULL DEFAULT 0,
  permission_id INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  FOREIGN KEY (permission_id) REFERENCES permissions (id)
);

CREATE TABLE survey_banned_ips (
  id INTEGER NOT NULL AUTO_INCREMENT,
  survey_id INTEGER NOT NULL,
  ip VARCHAR(15) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (survey_id) REFERENCES surveys (id)
);

CREATE TABLE survey_banned_users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  survey_id INTEGER NOT NULL,
  user_id INTEGER DEFAULT NULL,
  shadow_username VARCHAR(60) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (survey_id) REFERENCES surveys (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT id_or_shadow_user CHECK (user_id IS NOT NULL OR shadow_username IS NOT NULL)
);

CREATE TABLE questions (
  id INTEGER NOT NULL AUTO_INCREMENT,
  question TEXT CHARACTER SET utf8 NOT NULL,
  survey_id INTEGER NOT NULL,
  display_order SMALLINT,
  max_votes_per_user INTEGER,
  min_votes_per_user INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (survey_id) REFERENCES surveys (id)
);

CREATE TABLE answers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  answer TEXT CHARACTER SET utf8 NOT NULL,
  question_id INTEGER NOT NULL,
  display_order TINYINT,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE votes (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  answer_id INTEGER NOT NULL,
  vote_dtm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valid TINYINT NOT NULL DEFAULT 1,
  ip VARCHAR(15) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions (id),
  FOREIGN KEY (answer_id) REFERENCES answers (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
