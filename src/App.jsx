import React from "react";
import Layout from "./components/Layout";
import Cursor from "./components/DotRing";
import Loader from "./components/Loader";
import Background from "./components/Background";
import { AllRoutes } from "./routes/AllRoutes";
import "./App.css";

function App() {
  return (
    <div className="transition-all ease-linear overflow-hidden h-screen fixed">
      <Cursor />
      <Layout>
        <Background />
        <Loader />
        <AllRoutes />
      </Layout>
    </div>
  );
}

export default App;
