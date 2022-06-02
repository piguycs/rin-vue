import { supabase } from "../utils/supabase"

export default function logout() {
  return (
    <button onClick={() => {
      supabase.auth.signOut()
    }}>
      logout
    </button>
  )
}
