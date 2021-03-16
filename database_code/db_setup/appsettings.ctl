load data infile 'allappsettings.csv'
insert into table APPSETTING
fields terminated by "," optionally enclosed by '"'
(ID,VALUE,TYP_ID,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT)
