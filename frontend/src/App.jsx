import Home from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import NotFoundPage from "./pages/NotFoundPage"
import UserFavBooks from "./pages/UserFavBooks"
import GenreBooks from "./pages/GenreBooks"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginForm from "./pages/LoginPage"
import Summary from "./components/Summary"
import RegisterPage from "./pages/RegisterPage"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'

function LogOut(){
  localStorage.clear();
  return <Navigate to="/" />
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path="/genre/:genre" element={<GenreBooks />}/>
        <Route path="/summary" element={<Summary />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/mybooks" element={<ProtectedRoute><UserFavBooks /></ProtectedRoute>}/>
        <Route path="/mybooks/logout" element={<LogOut />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    )
  )
  
  return <RouterProvider router={router}/>

}

export default App
