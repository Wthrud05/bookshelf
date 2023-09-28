export const useAuth = () => {
  const isAuth = !!localStorage.getItem('user')
  const user = JSON.parse(localStorage.getItem('user'))
  return {isAuth, user}
}
