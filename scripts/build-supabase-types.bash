# Login to the supabase client
npx supabase login
# Generate the type for the project-id
npx supabase gen types --lang=typescript --project-id "susqpxhzasrjgkztxrbc" --schema public > types/supabase.d.ts
