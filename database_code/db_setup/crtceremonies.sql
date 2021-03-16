drop table CEREMONY cascade constraints;

create table CEREMONY (
    ID int NOT NULL,
    COLLEGE varchar2(6),
    MAJOR varchar2(6),
    DEGREE varchar2(50),
    DEPARTMENT varchar2(1000),
    CEREMONY_DATE date,
    LOCATION varchar2(1000),
    CREATED_BY int,
    UPDATED_BY int,
    CREATED_AT date,
    UPDATED_AT date,
    CONSTRAINT pk_ceremony_id PRIMARY KEY (ID),
    CONSTRAINT fk_cmny_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_cmny_ub FOREIGN KEY (CREATED_BY) REFERENCES USR (ID)
);

exit;
/
