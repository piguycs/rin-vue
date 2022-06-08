// this one shows on /userprofile/[user]
// this is for browaing other's profiles
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";


export default function Index() {
  const router = useRouter()
  const [userid, setID] = useState<any>(null)
  useEffect(() => {
    if (router.isReady) {
      const {user} = router.query
      setID(user)
    }
  }, [router.isReady])
  return (
    <>
    {userid ? <UserProfile userid={userid} />:null}
    </>
  )
}