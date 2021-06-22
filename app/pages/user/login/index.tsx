import { useRouter } from 'next/router'
import qs from 'querystring'
import React from 'react'
import { useProfile } from '../../../contexts/ProfileContext'

const Login: React.FC = () => {
  const { asPath, push } = useRouter()
  const { login } = useProfile()
  const token = qs.parse(asPath.substr(asPath.indexOf('#') + 1)).id_token
  if (typeof window !== 'undefined' && login(token as string)) {
    void push('/')
  }
  return <>Loading...</>
}

export default Login
