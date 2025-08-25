import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CheckCircle, Circle } from 'lucide-react'

function ClientOnboarding() {
  const location = useLocation()
  
  const steps = [
    { id: 'requirements', name: 'Requirements', path: '/client/onboarding/requirements' },
    { id: 'recommendations', name: 'Recommendations', path: '/client/onboarding/recommendations' },
    { id: 'preferences', name: 'Save Preferences', path: '/client/onboarding/preferences' }
  ]
  
  const getCurrentStep = () => {
    const currentPath = location.pathname
    return steps.findIndex(step => currentPath.includes(step.id))
  }
  
  const currentStepIndex = getCurrentStep()
  
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header with Progress */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Client Onboarding</h1>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    {index < currentStepIndex ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : index === currentStepIndex ? (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                    <span className={`text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-4 w-16 h-0.5 ${
                      index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className='px-4 sm:px-6 lg:px-8 py-8'>
        <div className="max-w-7xl mx-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default ClientOnboarding