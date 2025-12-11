import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PropertyReport from "./pages/PropertyReport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/property-report/:parcelId" element={<PropertyReport />} />
    </Routes>
  );
}

export default App;
