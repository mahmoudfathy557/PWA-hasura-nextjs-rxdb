import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import HomeWrapper from './HomeWrapper'

export default function Home() {
  const router = useRouter()

  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return <HomeWrapper />
  } else return <a href='/api/auth/login'>Login</a>
}
