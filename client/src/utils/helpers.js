export const filterUsersByParam = (arr, str) => {
  return arr.filter((item) => item.name.toLowerCase().includes(str.toLowerCase()))
}

export const filterBooksByParam = (arr, str, param) => {
  switch (param) {
    case 'Название':
      return arr.filter((item) => item.title.toLowerCase().includes(str.toLowerCase()))

    case 'Автор':
      return arr.filter((item) => item.author.toLowerCase().includes(str.toLowerCase()))

    case 'Дата':
      return arr.filter((item) => item.read_date.includes(str))

    case '':
      return arr
  }
}

export const sortByType = (type, arr, str, searchType) => {
  switch (type) {
    case 'Новые':
      return filterBooksByParam(
        arr.sort((a, b) => b.book_id - a.book_id),
        str,
        searchType,
      )

    case 'Старые':
      return filterBooksByParam(
        arr.sort((a, b) => a.book_id - b.book_id),
        str,
        searchType,
      )

    case 'Печатные':
      return filterBooksByParam(
        arr.sort((a, b) => b.book_id - a.book_id).filter((item) => (item.isaudio ? null : item)),
        str,
        searchType,
      )

    case 'Аудио':
      return filterBooksByParam(
        arr.sort((a, b) => b.book_id - a.book_id).filter((item) => (item.isaudio ? item : null)),
        str,
        searchType,
      )
  }
}

export const changeTextByCount = (count) => {
  const lastItem = +count.toString().substr(-1)

  if (lastItem === 1) return 'книга'

  if (lastItem < 5 && lastItem !== 0) return 'книги'

  return 'книг'
}
