import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      setError(null)

      try {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          })

        if (signInError) {
          setError(
            signInError.message || 'Invalid email or password'
          )
          return false
        }

        if (data.user) {
          router.push('/admin')
          return true
        }

        return false
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred'
        setError(message)
        return false
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        setError(signOutError.message || 'Failed to sign out')
        return false
      }

      router.push('/admin/login')
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      return false
    } finally {
      setLoading(false)
    }
  }, [router])

  return {
    signIn,
    signOut,
    loading,
    error,
  }
}
