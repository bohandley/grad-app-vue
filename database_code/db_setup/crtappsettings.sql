drop table APPSETTING cascade constraints;

create table APPSETTING (
    ID int NOT NULL,
    VALUE number,
    TYP_ID int,
    CREATED_BY int,
    UPDATED_BY int,
    CREATED_AT date,
    UPDATED_AT date,
    CONSTRAINT pk_as_id PRIMARY KEY (ID),
    CONSTRAINT fk_astyp_id FOREIGN KEY (TYP_ID) REFERENCES TYP (ID),
    CONSTRAINT fk_as_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_as_ub FOREIGN KEY (UPDATED_BY) REFERENCES USR (ID)
);

exit;
/
