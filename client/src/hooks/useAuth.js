export const useAuth = () => {
  return !!localStorage.getItem('user')
}
