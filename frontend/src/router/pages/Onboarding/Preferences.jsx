import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Check } from 'lucide-react';

function Preferences() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      shareProfile: false,
      showInDirectory: true,
      allowMessages: true
    },
    communication: {
      preferredTime: 'morning',
      language: 'english',
      contactMethod: 'email'
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePreferenceChange = (category, key, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaved(true);
    setIsSaving(false);
    
    // Navigate to next step after a brief delay
    setTimeout(() => {
      navigate('/recommendations/designer');
    }, 1000);
  };

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferences Saved!</h2>
          <p className="text-gray-600">Your preferences have been saved successfully. Redirecting to designer recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Save Your Preferences</h2>
        <p className="text-gray-600">Customize your experience and communication preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Notification Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Email notifications</label>
              <input
                type="checkbox"
                checked={preferences.notifications.email}
                onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">SMS notifications</label>
              <input
                type="checkbox"
                checked={preferences.notifications.sms}
                onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Push notifications</label>
              <input
                type="checkbox"
                checked={preferences.notifications.push}
                onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Privacy Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Share profile publicly</label>
              <input
                type="checkbox"
                checked={preferences.privacy.shareProfile}
                onChange={(e) => handlePreferenceChange('privacy', 'shareProfile', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Show in directory</label>
              <input
                type="checkbox"
                checked={preferences.privacy.showInDirectory}
                onChange={(e) => handlePreferenceChange('privacy', 'showInDirectory', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Allow direct messages</label>
              <input
                type="checkbox"
                checked={preferences.privacy.allowMessages}
                onChange={(e) => handlePreferenceChange('privacy', 'allowMessages', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Preferred contact time</label>
              <select
                value={preferences.communication.preferredTime}
                onChange={(e) => handlePreferenceChange('communication', 'preferredTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Language</label>
              <select
                value={preferences.communication.language}
                onChange={(e) => handlePreferenceChange('communication', 'language', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Preferred contact method</label>
              <select
                value={preferences.communication.contactMethod}
                onChange={(e) => handlePreferenceChange('communication', 'contactMethod', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="chat">In-app Chat</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSavePreferences}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Preferences;