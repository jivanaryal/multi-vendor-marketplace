import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./hoc/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import UserReducer from "./dummy/UserReducer"
import NotFound from "./NotFound"
import CreateCategory from "./pages/categories/CreateCategory"

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
      <Route path="/reducer" element={<UserReducer />} />
      <Route path="/category/new" element={<CreateCategory />} />
      


    </Route>
    <Route path="*" element={<NotFound />} />
    </Route>
))

const App = () => {
  return (
   
    <RouterProvider router={router} />
  )
}

export default App