import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutLoader } from "./components/layout/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {

  // const { user, loader } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
          // element={
          //   <SocketProvider>
          //     <ProtectRoute user={user} />
          //   </SocketProvider>
          // }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/login"
            element={
              // <ProtectRoute user={!user} redirect="/">
              <Login />
              // </ProtectRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
