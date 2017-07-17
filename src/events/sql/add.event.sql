-- Inserts a new events
-- $1: Title of the new event
-- $2: Description of the event
-- $3: Date of the event
-- $4: User ID that created the event
with insert_event as (
  insert into events(title, description, date, user)
  values($1,$2,$3,$4) returning id
)
insert into attendees(event_id, user_id)
values((select * from insert_event), $4)
returning event_id