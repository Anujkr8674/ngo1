import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Example utility for Supabase Storage (Buckets)
export const getBucketUrl = (path: string) => {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET!
  return supabase.storage.from(bucketName).getPublicUrl(path).data.publicUrl
}
