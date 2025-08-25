import React from 'react';
import { Outlet } from 'react-router-dom';
import FreelancerNavbar from '../FreelancerNavbar';

function FreelancerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FreelancerNavbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default FreelancerLayout;
