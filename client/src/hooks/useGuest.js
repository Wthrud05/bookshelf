export const useGuest = () => {
  const isGuest = !JSON.parse(localStorage.getItem('user'))
  console.log(isGuest)
  return isGuest
}
