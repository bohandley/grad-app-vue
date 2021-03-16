drop table DATAPOINT cascade constraints;

create table DATAPOINT (
    ID int NOT NULL,
    USR_ID int,
    TYP_ID int,
    TEXT varchar2(100),
    CREATED_BY int,
    CREATED_AT DATE,
    UPDATED_BY int,
    UPDATED_AT DATE,
    TERMCODE varchar2(6),
    CONSTRAINT pk_datapoint PRIMARY KEY (ID),
    CONSTRAINT fk_dp_usr_id FOREIGN KEY (USR_ID) REFERENCES USR (ID),
    CONSTRAINT fk_dp_typ_id FOREIGN KEY (TYP_ID) REFERENCES TYP (ID),
    CONSTRAINT fk_dp_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_dp_ub FOREIGN KEY (UPDATED_BY) REFERENCES USR (ID)
);

exit;
/
