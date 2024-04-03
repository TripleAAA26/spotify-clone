import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


const getSongs = async ():Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_URL,
    })

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    return (data as any) || []
}

export default getSongs