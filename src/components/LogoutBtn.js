import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'react-bootstrap'

const LogoutBtn = () => {
  const router = useRouter()

  return (
    <Button
      id='qsLogoutBtn'
      bsStyle='primary'
      className='btn-margin logoutBtn'
      onClick={() => router.replace('/api/auth/logout')}
    >
      Log Out
    </Button>
  )
}

export default LogoutBtn
