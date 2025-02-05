import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import getSongs from '@/actions/getSongs'


const getSongsByTitle = async (title: string):Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_URL,
    })

    if (!title) {
        const allSongs = await getSongs()
        return allSongs
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    return (data as any) || []
}

export default getSongsByTitle