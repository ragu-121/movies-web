import './App.css'
import Layout from './layout/layout'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/home';
import ViewMovie from './pages/viewMovies';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      children:[
        {
          index:true,
          Component:Home,
        },
        {
          path:'viewmovie/:movie_id',
          Component:ViewMovie
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
