import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./hoc/Layout"
import Dashboard from "./pages/dashboard/Dashboard"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />

  </Route>
))

const App = () => {
  return (
   
    <RouterProvider router={router} />
  )
}

export default App