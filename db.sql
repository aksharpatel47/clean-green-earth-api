create table if not exists users (
  uid varchar(50) primary key not null,
  name varchar(50) not null default 'Anonymous',
  image varchar(100),
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now()
);

create table if not exists events (
  id varchar(50) primary key not null,
  title varchar(50) not null,
  description varchar(1000),
  image varchar(100),
  location point not null,
  address varchar(300),
  date timestamp with time zone not null,
  duration integer not null,
  user_id varchar(50) not null references users(uid) on delete cascade on update cascade,
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now()
);

create table if not exists attendance (
  event_id varchar(50) not null references events(id) on delete cascade on update cascade,
  user_id varchar(50) not null references users(uid) on delete cascade on update cascade,
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now(),
  primary key (event_id, user_id)
);

create extension cube;
create extension earthdistance;