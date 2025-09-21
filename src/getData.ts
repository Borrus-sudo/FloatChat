import { createClient } from '@supabase/supabase-js';

export async function loadData(): Promise<any[]> {
    const supabaseURL = 'https://faeqtixmrdxqlhxitvcu.supabase.co/';
    const key = import.meta.env.PUB_KEY;
    const supabase = createClient(supabaseURL, key);
    // Make a request
    const { data, error } = await supabase.from('measurements').select('*');

    if (error) {
        return [];
    }
    return data;
}
