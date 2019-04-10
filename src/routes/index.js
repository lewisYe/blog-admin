import { lazy } from 'react';
const Main = lazy(() => import('../layouts/main/index'));
const Account = lazy(() => import('../pages/account'));
const Article = lazy(() => import('../pages/article'));
const Tags = lazy(() => import('../pages/tags'));
const Home = lazy(() => import('../pages/home'));

const routes = [
  {
    path: "/",
    component: Main,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/account",
        exact: true,
        component: Account
      },
      {
        path: "/article",
        exact: true,
        component: Article
      },
      {
        path: "/tags",
        exact: true,
        component: Tags
      }
    ]
  }
];

export default routes;