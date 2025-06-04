// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Thay thế URL và Key của bạn ở đây
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
 