import {useLocation} from 'react-router-dom'

export const useIsUser = () => {
  const navigation = useLocation()
  return navigation.pathname === '/profile' ? false : true
}
