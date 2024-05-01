CREATE TABLE IF NOT EXISTS users
(
    id               BIGINT PRIMARY KEY,
    email            VARCHAR(255),
    first_name       VARCHAR(255),
    last_name        VARCHAR(255),
    password         VARCHAR(255),
    nickname         VARCHAR(255),
    phone_number     VARCHAR(20),
    telegram_nick    VARCHAR(255),
    team_id          INT,
    success_attempts INT,
    attempts         INT,
    role             VARCHAR(50),
    status           VARCHAR(50)
);

CREATE SEQUENCE users_seq;

CREATE TABLE IF NOT EXISTS teams
(
    id               BIGINT PRIMARY KEY,
    title            VARCHAR(255),
    leader           BIGINT,
    second_person    BIGINT,
    third_person     BIGINT,
    success_attempts BIGINT,
    attempts         BIGINT,
    invite       VARCHAR(255)
);

CREATE SEQUENCE teams_seq;

CREATE TABLE ctf_teams
(
    id          BIGINT PRIMARY KEY,
    team_id     BIGINT,
    description VARCHAR(1024),
    status      VARCHAR(50)
);

CREATE SEQUENCE ctf_teams_seq;
