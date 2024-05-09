-- This is an empty migration.
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_auth_user_updated on auth.users;
drop trigger if exists on_auth_user_deleted on auth.users;

create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into "public"."Profile" (id, email)
    values (new.id, new.email);
    -- values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email, new.phone, now());
    return new;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- FUNCTION TO UPDATE USER PROFILE
create or replace function public.handle_update_user() 
returns trigger as $$
begin
    update "public"."Profile"
    set email = new.email
    where id = new.id;
    return new;
end;

$$ language plpgsql security definer set search_path = public;
create trigger on_auth_user_updated
    after update of email on auth.users
  for each row execute procedure public.handle_update_user();

-- FUNCTION TO DELETE USER PROFILE
create or replace function public.handle_delete_user()
returns trigger as $$
begin
    delete from "public"."Profile"
    where id = old.id;
    return old;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_deleted
    after delete on auth.users
    for each row execute procedure public.handle_delete_user();