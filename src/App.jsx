import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import JurosCompostos from "./pages/JurosCompostos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/juros-compostos" element={<JurosCompostos />} />
      </Routes>
    </BrowserRouter>
  );
}