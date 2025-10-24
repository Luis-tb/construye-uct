import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export function useSupabaseAuth() {
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user ?? null)
        }

        fetchUser().catch(console.error)

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            subscription?.subscription.unsubscribe()
        }
    }, [])

    return { user }
}
