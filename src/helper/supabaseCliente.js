import { createClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

const supabaseUrl = 'https://gswarigfpqqevbosexac.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzd2FyaWdmcHFxZXZib3NleGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTczNzYsImV4cCI6MjA2MTQzMzM3Nn0.8i6sG86GHoJja4Yu9bcsb9Bl8QtxC68tAlduLe3Vr-o'
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase

const googleId = '13585251538-776069u4so7j1v34aorf06bvsnghg19i.apps.googleusercontent.com'
const googleKeySecret = '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'