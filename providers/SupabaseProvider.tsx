'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { Database } from '@/types_db'

interface SupabaseProviderProps {
    children: React.ReactNode
}

export default function SupabaseProvider({ children }:SupabaseProviderProps) {
    const [ supabaseClient ] =
        useState(() =>
            createClientComponentClient<Database>({
                supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
                supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_URL,
            })
        )

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

