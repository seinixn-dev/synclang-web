import { useEffect } from 'react'
import useAppStore from '@/store/app.tsx'

export const Home = () => {
  const { setIsShowHeader } = useAppStore()

  useEffect(() => {
    setIsShowHeader(false)
    return () => {
      setIsShowHeader(true)
    }
  }, [])
  return (
    <div>
      <h1>Synclang</h1>
      <p>是一个多语言管理平台</p>
    </div>
  )
}

export default Home
