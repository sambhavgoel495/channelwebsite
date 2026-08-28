import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export const getSupabaseAdmin = () => {
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing in environment');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const ensureUserExistsInPublic = async (user: {
  id: string;
  email?: string;
  user_metadata?: any;
}) => {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const meta = user.user_metadata || {};
    const name = meta.full_name || meta.name || user.email?.split('@')[0] || 'Creator';
    const email = user.email || '';
    const avatar = meta.avatar_url || '';

    const { error } = await supabaseAdmin.from('users').upsert(
      {
        id: user.id,
        name: name,
        email: email,
        avatar: avatar,
        is_admin: false,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.error('Error in ensureUserExistsInPublic upsert:', error);
    }
  } catch (err) {
    console.error('Exception in ensureUserExistsInPublic:', err);
  }
};