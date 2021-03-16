load data infile 'alltyps.csv'
insert into table TYP
fields terminated by "," optionally enclosed by '"'
(ID,TEXT,CREATED_BY,CREATED_AT,UPDATED_BY,UPDATED_AT)
