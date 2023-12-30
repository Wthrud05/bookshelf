import main from '../assets/main.svg'
import profile from '../assets/profile.svg'
import about from '../assets/about.svg'

export const userInfo = [
  {books: [0, 10], status: 'Новичок', img: '/statuses/newbie-reader.svg'},
  {books: [10, 20], status: 'Читатель', img: '/statuses/reader.svg'},
  {books: [20, 30], status: 'Библиофил', img: '/statuses/bibliophile.svg'},
  {books: [30, 40], status: 'Книголюб', img: '/statuses/bibliophile.svg'},
  {books: [40, 50], status: 'Книжный фанат', img: '/statuses/book-fan.svg'},
  {books: [50, 75], status: 'Литературный гурман', img: '/statuses/book-gourmet.svg'},
  {
    books: [75, 100],
    status: 'Литературный энциклопедист',
    img: '/statuses/literature-encyclopedia.svg',
  },
  {
    books: [100, Infinity],
    status: 'Книжный магнат',
    img: '/statuses/book-tycoon.svg',
  },
]

export const sortTypes = ['Новые', 'Старые', 'Печатные', 'Аудио']
export const searchTypes = ['Название', 'Автор']

export const nav = [
  {name: 'Главная', path: '/', icon: main},
  {name: 'Профиль', path: '/profile', icon: profile},
  {name: 'О Bookshelf', path: '/about', icon: about},
]

export const guestNav = [
  {name: 'Авторизация', path: '/login', icon: null},
  {name: 'Регистрация', path: '/register', icon: null},
]
