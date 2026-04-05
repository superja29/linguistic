import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://awcelaszrguceeaetokc.supabase.co';
const supabaseKey = 'sb_publishable_f54ZYI683s-BOA73qZORqQ_cldIe105';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
