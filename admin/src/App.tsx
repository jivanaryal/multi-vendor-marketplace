import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./hoc/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import UserReducer from "./dummy/UserReducer"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="/reducer" element={<UserReducer />} />


  </Route>
))

const App = () => {
  return (
   
    <RouterProvider router={router} />
  )
}

export default App