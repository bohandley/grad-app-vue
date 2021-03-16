drop table ADMINTEXT cascade constraints;

create table ADMINTEXT (
    ID int NOT NULL,
    TEXT varchar2(2000),
    TYP_ID int,
    CREATED_BY int,
    UPDATED_BY int,
    CREATED_AT date,
    UPDATED_AT date,
    CONSTRAINT pk_admintext_id PRIMARY KEY (ID),
    CONSTRAINT fk_attyp_id FOREIGN KEY (TYP_ID) REFERENCES TYP (ID),
    CONSTRAINT fk_at_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_at_ub FOREIGN KEY (UPDATED_BY) REFERENCES USR (ID)
);

exit;
/
