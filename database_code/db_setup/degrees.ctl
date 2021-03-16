load data infile 'alldegrees.csv'
insert into table DEGREE
fields terminated by "," optionally enclosed by '"'
(ID,NDID,DEGREE_NAME,COLLEGE,MAJOR,DEPARTMENT,TERM_CODE_GRAD,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT)
