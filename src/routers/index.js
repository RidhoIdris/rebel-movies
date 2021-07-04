import Home from '../pages/Home'
import Detail from '../pages/Detail'

export const routes = [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/detail/:id',
      component: Detail,
    }
  ]

export default routes