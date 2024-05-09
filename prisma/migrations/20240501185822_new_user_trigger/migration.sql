-- This is an empty migration.

create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into "public"."profiles" (id, email)
    values (new.id, new.email);
    -- values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email, new.phone, now());
    return new;
end;

$$ language plpgsql security definer;

-- FUNCTION TO UPDATE USER PROFILE
create or replace function public.handle_update_user() 
returns trigger as $$
begin
    update "public"."profiles"
    set email = new.email
    where id = new.id;
    return new;
end;

$$ language plpgsql security definer set search_path = public;

-- FUNCTION TO DELETE USER PROFILE
create or replace function public.handle_delete_user()
returns trigger as $$
begin
    delete from "public"."profiles"
    where id = old.id;
    return old;
end;

$$ language plpgsql security definer;