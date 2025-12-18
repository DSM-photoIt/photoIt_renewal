import { createBrowserRouter } from "react-router-dom";
import { ChristmasFrameSelectPage, FrameSelectPage, Main, ResultPage } from "./pages";
import { AppLayout } from "./layouts";
import { WinterSnackFrameSelectPage } from "./pages/WinterSnackFrameSelectPage";
import { WebCamPage } from "./pages/WebCamPage";

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
      },
      {
        path: '/capture/:id',
        element: <WebCamPage/>
      },
      {
        path: '/result/:id',
        element: <ResultPage/>
      }
    ]
  }
])