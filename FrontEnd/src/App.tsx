import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./pages/HomePage";
import { useMsal } from "@azure/msal-react";
import ReviewPage from "./pages/ReviewPage";


function App() {

   const { instance, accounts, inProgress } = useMsal();

  console.log("MSAL accounts:", accounts);
  console.log("MSAL active account:", instance.getActiveAccount());
  console.log("MSAL progress:", inProgress);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/writeReview" element={<ReviewPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;