drop table TICKET cascade constraints;

create table TICKET (
    ID int NOT NULL,
    USR_ID int,
    AMOUNT number,
    TYP_ID int,
    CEREMONY_ID int,
    TERMCODE number,
    CREATED_BY int,
    UPDATED_BY int,
    CREATED_AT date,
    UPDATED_AT date,
    CONSTRAINT pk_ticket_id PRIMARY KEY (ID),
    CONSTRAINT fk_ticket_usr_id FOREIGN KEY (USR_ID) REFERENCES USR (ID),
    CONSTRAINT fk_ticket_typ_id FOREIGN KEY (TYP_ID) REFERENCES TYP (ID),
    CONSTRAINT fk_ticket_cb FOREIGN KEY (CREATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_ticket_ub FOREIGN KEY (UPDATED_BY) REFERENCES USR (ID),
    CONSTRAINT fk_ticket_ceremony_id FOREIGN KEY (CEREMONY_ID) REFERENCES CEREMONY (ID)
);

exit;
/
