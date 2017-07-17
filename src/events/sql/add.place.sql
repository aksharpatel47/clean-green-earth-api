insert into places(id,name,address,coordinate)
values($1,$2,$3,$4) on conflict do nothing