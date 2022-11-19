import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Layout from '../../src/components/Layout'

const ApiProfile = () => {
  const { user, isLoading } = useUser()

  const [data, setData] = useState(null)

  const getData = async () => {
    const res = await fetch('/api/protected-api')

    const data = await res.json()

    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout user={user} loading={isLoading}>
      <div>
        <h1>Profile</h1>

        <div>
          <h3>Public page (client rendered)</h3>
          <p>We are fetching data on the client-side :</p>
          <p>By making request to '/api/protected-api' serverless function</p>
          <p>so without a valid session cookie will fail</p>
          <p>{JSON.stringify(data)}</p>
        </div>
      </div>
    </Layout>
  )
}

// Public route.(CSR) also accessing API from the client-side.
// data is not cached when redirecting between pages.
export default ApiProfile
