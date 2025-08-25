
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const userTrendsData = [
  { month: "Jan", users: 300 },
  { month: "Feb", users: 200 },
  { month: "Mar", users: 250 },
  { month: "Apr", users: 280 },
  { month: "May", users: 400 },
  { month: "Jun", users: 350 },
  { month: "Jul", users: 450 },
];

const platformActivityData = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 150 },
  { day: "Wed", users: 130 },
  { day: "Thu", users: 140 },
  { day: "Fri", users: 160 },
  { day: "Sat", users: 170 },
  { day: "Sun", users: 180 },
];

const designStyles = [
  { name: "Modern", value: 80 },
  { name: "Minimalist", value: 95 },
  { name: "Rustic", value: 70 },
  { name: "Industrial", value: 40 },
  { name: "Bohemian", value: 50 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="col-span-1 space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl shadow">
            <p className="text-gray-600">Total Clients</p>
            <h2 className="text-xl font-bold">1,250</h2>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl shadow">
            <p className="text-gray-600">Total Designers</p>
            <h2 className="text-xl font-bold">350</h2>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl shadow">
            <p className="text-gray-600">Active Chats</p>
            <h2 className="text-xl font-bold">420</h2>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl shadow">
            <p className="text-gray-600">Active Projects</p>
            <h2 className="text-xl font-bold">180</h2>
          </div>
        </div>

        
        <div className="col-span-3 space-y-6">
          
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">
              User Onboarding Trends
            </h2>
            <p className="text-sm text-gray-600">
              New Users Over Time <span className="text-green-600 font-semibold">+15%</span>
            </p>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Most Popular Design Styles */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">
              Most Popular Design Styles
            </h2>
            <p className="text-sm text-gray-600">
              Style Preferences <span className="text-green-600 font-semibold">+8%</span>
            </p>
            <div className="mt-4 space-y-3">
              {designStyles.map((style, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{style.name}</span>
                    <span>{style.value}%</span>
                  </div>
                  <div className="w-full   h-10">
                    <div
                      className="bg-blue-500 h-10 "
                      style={{ width: `${style.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Platform Activity</h2>
            <p className="text-sm text-gray-600">
              Daily Active Users <span className="text-green-600 font-semibold">+5%</span>
            </p>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="70%" height="100%">
                <BarChart data={platformActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Alerts</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">Pending Designer Approvals</p>
                  <p className="text-sm text-gray-600">
                    3 new designers awaiting portfolio review
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">View</button>
              </div>

              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">Flagged Chats</p>
                  <p className="text-sm text-gray-600">2 chats flagged for review</p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">View</button>
              </div>

              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">Disputes</p>
                  <p className="text-sm text-gray-600">
                    1 open dispute requiring attention
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
