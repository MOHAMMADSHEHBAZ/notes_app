import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Getstated from './components/Getstated.jsx'
import Signin from './components/Signin.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import AuthLayout from './components/AuthLayout.jsx'
import NotFound from './components/NotFound.jsx'
import Admin from './components/Admin.jsx'
import UploadNotes from './components/UploadNotes.jsx'
import GetNotes from './components/GetNotes.jsx'
import Allnotes from './components/Allnotes.jsx'
import Post from './components/Post.jsx'

const router = createBrowserRouter(
  [{
    path:'/',
    element: <App/>,
    children:[
      {
        path:'*',
        element:(
          <AuthLayout authentication={false}>
          <NotFound/>
          </AuthLayout>
          )
      },
      {
        path:'contact',
        element:(
          <AuthLayout authentication={false}>
            <Contact/>
          </AuthLayout>
        )
      },
      {
        path:'getstarted',
        element:(
          <AuthLayout authentication={false}>
          <Getstated/>
          </AuthLayout>
        )
      },
      {
        path:'signin',
        element:(
          <AuthLayout authentication={false}>
          <Signin/>
          </AuthLayout>
        )
      },
      {
        path:'/',
        element:(
         <Home/>        
        )
      },
      {
        path:'/profile',
        element:(
        <AuthLayout authentication>
          {" "}
         <Admin/>
        </AuthLayout>
        )
      },
      {
        path:'/uplaodNotes',
        element:(
        <AuthLayout authentication>
          {" "}
         <UploadNotes/>
        </AuthLayout>
        )
      },
      {
        path:'/MyNotes',
        element:(
        <AuthLayout authentication>
          {" "}
         <GetNotes/>
        </AuthLayout>
        )
      },
      // {
      //   path:'/Allnotes',
      //   element:(
      //   <AuthLayout authentication>
      //     {" "}
      //    <Allnotes/>
      //   </AuthLayout>
      //   )
      // },
      {
        path: "/post/:fileId",
        element: <Post/>
      },
    ]
  }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
