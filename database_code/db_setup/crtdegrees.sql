drop table DEGREE cascade constraints;

create table DEGREE (
    ID int NOT NULL,
    NDID varchar2(9),
    DEGREE_NAME varchar2(30),
    COLLEGE varchar2(30),
    MAJOR varchar2(6),
    DEPARTMENT varchar2(40),
    TERM_CODE_GRAD varchar2(6),
    CREATED_BY int,
    UPDATED_BY int,
    CREATED_AT date,
    UPDATED_AT date,
    CONSTRAINT pk_degree_id PRIMARY KEY (ID),
    CONSTRAINT fk_degree_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_degree_ub FOREIGN KEY (UPDATED_BY) REFERENCES USR (ID)
);

exit;
/
