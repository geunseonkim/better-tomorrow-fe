import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./pages/Main/MainPage";
import DetailPage from "./pages/Detail/DetailPage";
import Carousel from "./common/Carousel";
import MultiCarousel from "./pages/MultiCarousel/MultiCarousel";
function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<MainPage />} />
    //     <Route path="detail">
    //       <Route path=":id" element={<DetailPage />} />
    //     </Route>
    //   </Route>
    // </Routes>
    <div>
      <MultiCarousel />
    </div>
  );
}

export default App;
