-- 1. Update the trigger function for FUTURE users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, phone, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'phone',
    'customer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Backfill phone numbers for EXISTING users
UPDATE public.profiles
SET phone = auth.users.raw_user_meta_data->>'phone'
FROM auth.users
WHERE public.profiles.id = auth.users.id
AND public.profiles.phone IS NULL;
