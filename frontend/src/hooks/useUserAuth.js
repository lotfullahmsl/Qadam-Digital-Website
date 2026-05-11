import { useContext } from 'react'
import { UserAuthContext } from '../context/UserAuthContext'

export function useUserAuth() {
  return useContext(UserAuthContext)
}
