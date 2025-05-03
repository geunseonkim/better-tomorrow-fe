import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./pages/Main/MainPage";
import DetailPage from "./pages/Detail/DetailPage";
import RecommendVideos from "./pages/RecommendVideos/RecommendVideos";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<MainPage />} />
    //     <Route path="detail">
    //       <Route path=":id" element={<DetailPage />} />
    //     </Route>
    //     <Route path="recommend" element={<RecommendVideos />} />
    //   </Route>
    // </Routes>
    <div>
      <RecommendVideos />
    </div>
  );
}

export default App;
