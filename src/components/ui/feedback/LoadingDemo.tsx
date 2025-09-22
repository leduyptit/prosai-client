import React, { useState } from 'react';
import { Button } from 'antd';
import { Loading, LoadingWrapper } from './index';

const LoadingDemo: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState({
    fullscreen: false,
    inline: false,
    centered: false,
    wrapper: false,
    dots: false,
    pulse: false
  });

  const startLoading = (type: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [type]: false }));
    }, 3000);
  };

  if (loadingStates.fullscreen) {
    return (
      <Loading 
        size="large" 
        text="Loading fullscreen demo..." 
        variant="fullscreen"
      />
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-medium mb-6">Loading Components Demo</h1>
      
      {/* Fullscreen Loading */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Fullscreen Loading</h2>
        <Button 
          type="primary" 
          onClick={() => startLoading('fullscreen')}
        >
          Start Fullscreen Loading
        </Button>
      </div>

      {/* Inline Loading */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Inline Loading</h2>
        <div className="flex items-center space-x-4">
          <Button onClick={() => startLoading('inline')}>
            Start Inline Loading
          </Button>
          {loadingStates.inline && (
            <Loading 
              size="small" 
              text="Processing..." 
              variant="inline"
            />
          )}
        </div>
      </div>

      {/* Centered Loading */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Centered Loading</h2>
        <div className="h-32 border rounded relative">
          {loadingStates.centered ? (
            <Loading 
              size="medium" 
              text="Loading centered..." 
              variant="centered"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button onClick={() => startLoading('centered')}>
                Start Centered Loading
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Loading Wrapper */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Loading Wrapper</h2>
        <LoadingWrapper 
          loading={loadingStates.wrapper}
          loadingText="Loading content..."
          loadingSize="medium"
          loadingVariant="centered"
        >
          <div className="space-y-2">
            <p>This content will be hidden when loading</p>
            <Button onClick={() => startLoading('wrapper')}>
              Start Wrapper Loading
            </Button>
          </div>
        </LoadingWrapper>
      </div>

      {/* Different Spinner Types */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Spinner Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dots */}
          <div className="border rounded p-4 text-center">
            <h3 className="font-medium mb-2">Dots Animation</h3>
            {loadingStates.dots ? (
              <Loading 
                size="medium" 
                text="Loading..." 
                spinnerType="dots"
                variant="centered"
              />
            ) : (
              <Button onClick={() => startLoading('dots')}>
                Start Dots
              </Button>
            )}
          </div>

          {/* Pulse */}
          <div className="border rounded p-4 text-center">
            <h3 className="font-medium mb-2">Pulse Animation</h3>
            {loadingStates.pulse ? (
              <Loading 
                size="medium" 
                text="Loading..." 
                spinnerType="pulse"
                variant="centered"
              />
            ) : (
              <Button onClick={() => startLoading('pulse')}>
                Start Pulse
              </Button>
            )}
          </div>

          {/* Default Spinner */}
          <div className="border rounded p-4 text-center">
            <h3 className="font-medium mb-2">Default Spinner</h3>
            <Loading 
              size="small" 
              text="" 
              variant="inline"
            />
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Size Variants</h2>
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <p className="text-sm mb-2">Small</p>
            <Loading size="small" text="" variant="inline" />
          </div>
          <div className="text-center">
            <p className="text-sm mb-2">Medium</p>
            <Loading size="medium" text="" variant="inline" />
          </div>
          <div className="text-center">
            <p className="text-sm mb-2">Large</p>
            <Loading size="large" text="" variant="inline" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo;
