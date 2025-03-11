# Login to the supabase client
npx supabase login
# Generate the type for the project-id
npx supabase gen types --lang=typescript --project-id "acjfdqwcgsnykwagycpa" --schema public > types/supabase.d.ts
