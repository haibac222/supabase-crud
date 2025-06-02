import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://easeretmxqwohwufyuga.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhc2VyZXRteHF3b2h3dWZ5dWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTQwNTQsImV4cCI6MjA2NDM3MDA1NH0.wwPOESaiuhSD6aLGy4SeUEuCtyW8zIwmEHBEF22wHPQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

