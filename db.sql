create table if not exists users (
  uid varchar(50) primary key not null,
  name varchar(50) not null default 'Anonymous'
);

create table if not exists events (
  id varchar(50) primary key not null,
  title varchar(50) not null,
  description varchar(1000),
  location point not null,
  user_id varchar(50) not null references users(uid)
);

create table if not exists attending (
  event_id varchar(50) not null references events(id),
  user_id varchar(50) not null references users(uid)
);