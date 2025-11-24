import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Rooms from "./components/pages/rooms";
import Layout from "./components/layout";
import Pub from "./components/pages/pub";
import { RoomDetail } from "./components/pages/roomDetail";

let routes: any[] = [];
try {
  routes = require("tempo-routes").default || [];
} catch {
  routes = [];
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/pub" element={<Pub />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
          </Route>
        </Routes>
      </>
    </Suspense>
  );
}

export default App;

