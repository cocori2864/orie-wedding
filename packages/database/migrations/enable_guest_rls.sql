-- Enable insert for anonymous users (guests)
CREATE POLICY "Enable insert for anon users" ON "public"."orders"
AS PERMISSIVE FOR INSERT
TO anon
WITH CHECK (true);

-- Enable select for anonymous users (guests) based on guest_info matching
-- This is tricky with RLS. A better approach for guest lookup is using a secure function.
-- For now, we might need to allow select for anon if we want client-side lookup,
-- BUT it exposes data.
-- So, for lookup, we should use a server action with service_role key OR a security definer function.

-- Let's just enable INSERT for now to fix the "new row violates..." error.
