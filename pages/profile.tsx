import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

type Props = {}

export default withPageAuthRequired(function Profile({ user }) {
  return <div>Hello {user.name}</div>
})
