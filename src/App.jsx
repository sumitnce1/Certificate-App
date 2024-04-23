import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Certificate from "./Certificate";
import GenerateCertificate from "./GenerateCertificate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Certificate />} />
          <Route
            path="/generate-certificate"
            element={<GenerateCertificate />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
