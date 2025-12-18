import { createBrowserRouter } from "react-router-dom";
import { Main } from "./pages";
import { AppLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout/>,
    children : [
      {
        path: '',
        element: <Main/>
      }
    ]
  }
])