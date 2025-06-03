// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Thay thế URL và Key của bạn ở đây
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
