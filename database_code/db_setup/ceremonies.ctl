load data infile 'allceremonies.csv'
insert into table CEREMONY
fields terminated by "," optionally enclosed by '"'
(ID,DEPARTMENT,CEREMONY_DATE,LOCATION,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT,COLLEGE,MAJOR,DEGREE)
