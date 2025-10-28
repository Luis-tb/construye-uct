import {supabase} from "@/lib/supabaseClient";
import type {User} from "@supabase/supabase-js";
import {useState, useEffect} from "react";

export function useSupabaseAuth() {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        // 1️⃣ Obtener la sesión actual
        const fetchSession = async () => {
            const {data: {session}, error} = await supabase.auth.getSession();
            if (error) console.error("Error getting session:", error.message);
            setUser(session?.user ?? null);
        };
        void fetchSession();

        // 2️⃣ Escuchar cambios de sesión (login/logout)
        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // 3️⃣ Cleanup del listener
        return () => listener.subscription.unsubscribe();
    }, []);

    return {user};
}
