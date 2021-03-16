load data infile 'alldatapoints.csv'
insert into table DATAPOINT
fields terminated by "," optionally enclosed by '"'
(ID,USR_ID,TYP_ID,TEXT,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT,TERMCODE)
