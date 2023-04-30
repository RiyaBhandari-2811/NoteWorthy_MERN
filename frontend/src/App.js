import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { createBrowserRouter,
  RouterProvider, } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";

const router = createBrowserRouter([
  {
    path: "/" ,
    element: <LandingPage />
  } , {
    path: "/mynotes" ,
    element: <MyNotes />
  }
])

function App() {
  return (
    <>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </>
  );
}

export default App;
