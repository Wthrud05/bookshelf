export const filterByParam = (arr, str) => {
  return arr.filter((item) => item.name.toLowerCase().includes(str.toLowerCase()))
}
