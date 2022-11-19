import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import App from '../src/components/App'
import * as Database from '../src/components/Database'
// import '../styles/App.css'

type Props = {}

const HomeWrapper = (props: Props) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const getData = async () => {
    // getting user data including access token and id token using serverless next api (protected-api.ts)

    const res = await fetch('/api/protected-api')

    const data = await res.json()

    // Check if Token (session) is valid
    if (data.error === 'jwt expired') {
      return router.replace('/api/auth/logout')
    }

    const db = await Database.createDb()
    const graphqlReplicator = new Database.GraphQLReplicator(db)
    graphqlReplicator.restart({
      userId: data.id,
      idToken: data.idToken,
    })
    setUser({ ...data, db })
  }

  useEffect(() => {
    getData()
  }, [])

  if (user) {
    return <App auth={{ userId: user?.id }} db={user.db} />
  }
}

export default HomeWrapper
