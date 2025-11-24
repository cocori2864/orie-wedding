-- 1. Drop existing policy that allows full update
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 2. Create a new policy that only allows updating specific columns
-- Note: PostgreSQL RLS doesn't support column-level permissions directly in the USING clause easily for updates in the same way.
-- Instead, we use a BEFORE UPDATE trigger or check the NEW vs OLD values, OR we can rely on the application not sending the role.
-- However, for strict security, we should use a trigger to prevent role changes by non-admins.

-- Alternative: Use a CHECK constraint or Policy with check option?
-- Actually, the simplest way in Supabase/Postgres for this specific case without complex triggers is:
-- Only allow update if the 'role' is NOT changing, OR if the user is an admin.

CREATE POLICY "Users can update own profile details" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND (
      -- Prevent changing role unless you are already an admin (which is circular but safe if we assume admins are trusted)
      -- Better: simply check if the new role is the same as the old role.
      -- But in RLS 'WITH CHECK', we can't easily access the 'OLD' row.
      -- So the standard approach is to separate the 'role' into a protected table or use a trigger.
      true 
    )
  );

-- Since RLS 'WITH CHECK' has limitations on accessing OLD values, the most robust way is a Trigger.

CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If the user is NOT an admin, they cannot change the role
  IF (old.role IS DISTINCT FROM new.role) AND (auth.jwt()->>'role' != 'service_role') THEN
      -- Check if the current user is an admin in the profiles table
      IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
          RAISE EXCEPTION 'You are not authorized to change the role.';
      END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS check_role_change ON public.profiles;
CREATE TRIGGER check_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.prevent_role_change();

-- Re-create the update policy (it was dropped above)
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
