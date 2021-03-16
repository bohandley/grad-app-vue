load data infile 'allusrs.csv'
insert into table USR
fields terminated by "," optionally enclosed by '"'
(ID,IS_ADMIN,NDID,FIRST_NAME,LAST_NAME,CREATED_AT,UPDATED_AT,CREATED_BY,UPDATED_BY)
