import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import React from "react";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const ClientOnboarding = lazy(() =>
  import("./pages/Onboarding/ClientOnboarding")
);
const Requirements = lazy(() => import("./pages/Onboarding/Requirements"));
const Recommendations = lazy(() =>
  import("./pages/Onboarding/Recommendations")
);
const Preferences = lazy(() => import("./pages/Onboarding/Preferences"));

const Chat = lazy(() => import("./pages/Chat/Chat"));
const Conversation = lazy(() => import("./pages/Chat/Conversation"));
const AdminChatMonitoring = lazy(() => import("./pages/Admin/ChatMonitoring"));

const Privacy = lazy(() => import("./pages/Admin/Privacy"));

const DesignerRecommendations = lazy(() =>
  import("./pages/Onboarding/DesignerRecommendation")
);
const ContextSuggestions = lazy(() =>
  import("./pages/Suggestions/ContextAware")
);

const Freelancer = lazy(() => import("./pages/Freelancer/Freelancer"));
const FreelancerOnboarding = lazy(() =>
  import("./pages/Freelancer/Onboarding")
);
const FreelancerProfile = lazy(() =>
  import("./pages/Freelancer/FreelancerProfile")
);
const Portfolio = lazy(() => import("./pages/Freelancer/Portfolio"));
const Services = lazy(() => import("./pages/Freelancer/Services"));

const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminUsers = lazy(() => import("./pages/Admin/Users"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Main Landing */}
          <Route path="/" element={<Home />} />

          {/* Client Onboarding */}
          <Route path="/client/onboarding" element={<ClientOnboarding />}>
            <Route path="requirements" element={<Requirements />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="preferences" element={<Preferences />} />
          </Route>

          {/* Chat System */}
          <Route path="/chat" element={<Chat />}>
            <Route path=":conversationId" element={<Conversation />} />
          </Route>
          <Route
            path="/admin/chat-monitoring"
            element={<AdminChatMonitoring />}
          />

          {/* Privacy */}
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/recommendations/designer"
            element={<DesignerRecommendations />}
          />

          {/* Context-Aware Suggestions */}
          <Route path="/suggestions" element={<ContextSuggestions />} />

          {/* Freelancer Section */}
          <Route path="/freelancer" element={<Freelancer />}>
            <Route index element={<FreelancerProfile />} />
            <Route path="onboarding" element={<FreelancerOnboarding />} />
            <Route path="profile" element={<FreelancerProfile />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="services" element={<Services />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/privacy" element={<Privacy />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
