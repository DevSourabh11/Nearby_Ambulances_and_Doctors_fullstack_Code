import React, { useState } from "react";
import Ambulance from "./pages/Ambulance/Ambulance.tsx";
import "./App.css";
import Header from "./components/Header/Header.tsx";
import Doctor from "./pages/Doctor/Doctor.tsx";

const App = () => {
  const [currentStep, setCurrentStep] = useState("AMBULANCES");
  const handleCurrentStep = (currentStep) => {
    setCurrentStep(currentStep);
  };
  return (
    <div>
      <Header onCurrentStep={handleCurrentStep} />
      {currentStep === "AMBULANCES" ? <Ambulance /> : <Doctor />}
    </div>
  );
}

export default App;
