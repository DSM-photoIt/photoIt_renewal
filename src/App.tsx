import { RouterProvider } from "react-router-dom"
import { GlobalStyle } from "./GlobalStyle"
import { router } from "./router"

export const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
      <GlobalStyle/>
    </div>
  )
}