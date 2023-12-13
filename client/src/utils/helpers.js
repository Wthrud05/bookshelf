export const filterByParam = (arr, str) => {
  return arr.filter((item) => item.name.toLowerCase().includes(str.toLowerCase()))
}

export const sortByType = (type, arr) => {
  console.log(type)
  let sortArr = []
  switch (type) {
    case 'Новые':
      sortArr = arr.sort((a, b) => b.book_id - a.book_id)
      break

    case 'Старые':
      sortArr = arr.sort((a, b) => a.book_id - b.book_id)
      break

    case 'Печатные':
      sortArr = arr
        .sort((a, b) => b.book_id - a.book_id)
        .filter((item) => (item.isaudio ? null : item))
      break

    case 'Аудио':
      sortArr = arr
        .sort((a, b) => b.book_id - a.book_id)
        .filter((item) => (item.isaudio ? item : null))
      break
  }
  return sortArr
}
