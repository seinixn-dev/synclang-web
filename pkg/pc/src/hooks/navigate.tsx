import { useNavigate } from 'react-router-dom'

export const useMyNavigate = () => {
  const navigate = useNavigate()
  const toLoginPage = () => navigate('/login')
  const toHomePage = () => navigate('/')
  return {
    toLoginPage,
    toHomePage
  }
}
