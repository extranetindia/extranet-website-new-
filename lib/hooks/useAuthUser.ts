import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const getUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()

        if (isMounted) {
          setUser(currentUser)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      }
    )

    getUser()

    return () => {
      isMounted = false
      authListener?.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
