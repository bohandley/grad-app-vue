drop table USR cascade constraints;

create table USR (
    ID int NOT NULL,
    IS_ADMIN number(1),
    NDID varchar2(9),
    FIRST_NAME varchar2(20),
    LAST_NAME varchar2(20),
    CREATED_AT DATE,
    UPDATED_AT DATE,
    CREATED_BY int,
    UPDATED_BY int,
    CONSTRAINT pk_usr_id PRIMARY KEY (ID)
);

exit;
/
