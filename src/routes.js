import Home from '@/components/Home'
import ArticleCreate from '@/components/Article/ArticleCreate'
import ArticleView from '@/components/Article/ArticleView'
import ArticleEdit from '@/components/Article/ArticleEdit'
import ArticleList from '@/components/Article/ArticleList'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

function castRouteParams(route) {
  return {
    id: Number(route.params.id)
  }
}

export default [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/article/list',
    name: 'article.list',
    component: ArticleList
  },
  {
    path: '/article/view/:id',
    props: castRouteParams,
    name: 'article.view',
    component: ArticleView
  },
  {
    path: '/article/create',
    name: 'article.create',
    component: ArticleCreate
  },
  {
    path: '/article/edit/:id',
    props: castRouteParams,
    name: 'article.edit',
    component: ArticleEdit
  },
]
