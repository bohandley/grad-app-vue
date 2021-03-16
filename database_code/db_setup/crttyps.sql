drop table TYP cascade constraints;

create table TYP (
    ID int NOT NULL,
    TEXT varchar2(50),
    CREATED_BY int,
    CREATED_AT date,
    UPDATED_BY int,
    UPDATED_AT date,
    CONSTRAINT pk_typ_id PRIMARY KEY (ID),
    CONSTRAINT fk_typ_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_typ_ub FOREIGN KEY (UPDATED_BY) REFERENCES USR (ID)
);

exit;
/
