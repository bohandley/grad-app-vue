load data infile 'alltickets.csv'
insert into table TICKET
fields terminated by "," optionally enclosed by '"'
(ID,USR_ID,AMOUNT,TYP_ID,CEREMONY_ID,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT,TERMCODE)
