import { createBrowserRouter } from "react-router-dom";
import { ChristmasFrameSelectPage, FrameSelectPage, Main } from "./pages";
import { AppLayout } from "./layouts";
import { WinterSnackFrameSelectPage } from "./pages/WinterSnackFrameSelectPage";

export const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout/>,
    children : [
      {
        path: '',
        element: <Main/>
      },
      {
        path: '/frame-select',
        element: <FrameSelectPage/>
      },
      {
        path: '/christmas-frame',
        element: <ChristmasFrameSelectPage/>
      },
      {
        path: '/winter-snack-frame',
        element: <WinterSnackFrameSelectPage/>
      }
    ]
  }
])