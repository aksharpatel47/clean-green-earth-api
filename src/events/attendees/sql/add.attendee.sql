-- Adds an attendee to an event
-- $1: Event ID
-- $2: User ID
insert into attendees(event, user)
values($1,$2)