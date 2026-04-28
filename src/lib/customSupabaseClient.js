import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://totbpjckyxxzosomfslv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdGJwamNreXh4em9zb21mc2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMDY3MzMsImV4cCI6MjA2NjU4MjczM30.NL8jNHwGc3pQnHrKJ_xKN0auQS1-xTfrm5J0hE1NciE';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
