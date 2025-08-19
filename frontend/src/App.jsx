import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomeScreen from "./components/pages/WelcomePage/WelcomePage";
import RoomSelection from "./components/pages/WelcomePage/RoomSelection";
import StyleSelection from "./components/pages/WelcomePage/StyleSelection";
import BudgetSelection from "./components/pages/WelcomePage/BudgetSelection";
import SpecialRequirements from "./components/pages/WelcomePage/Requirements";
import OnboardingStep1 from "./components/Layout/Freelancer/pages/OnboardingS1";
import PortfolioUpload from "./components/Layout/Freelancer/pages/OnboardingS2";
import ServicesForm from "./components/Layout/Freelancer/pages/OnboardingS3";
import FreelancerProfile from "./components/Layout/Freelancer/pages/FreelancerProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/rooms" element={<RoomSelection />} />
        <Route path="/budget" element={<BudgetSelection />} />
        <Route path="/style" element={<StyleSelection />} />
        <Route path="/requirements" element={<SpecialRequirements />} />
        <Route path="/onboardingS1" element={<OnboardingStep1 />} />
        <Route path="/onboardingS2" element={<PortfolioUpload />} />
        <Route path="/onboardingS3" element={<ServicesForm />} />
        <Route path="/onboardingProfile" element={<FreelancerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
