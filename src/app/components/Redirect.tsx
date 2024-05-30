import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type RedirectType = {
  to: string
}

const Redirect = ({ to }: RedirectType) => {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [])

  return null
}

export default Redirect
