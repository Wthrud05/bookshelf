export const useGuest = () => {
  const isGuest = !JSON.parse(localStorage.getItem('user'))
  return isGuest
}
