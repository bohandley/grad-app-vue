load data infile 'alladmintexts.csv'
insert into table ADMINTEXT
fields terminated by "," optionally enclosed by '"'
(ID,TEXT char(4000),TYP_ID,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT)
