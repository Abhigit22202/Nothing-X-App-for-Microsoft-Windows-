import React, { useState } from 'react';
import { Bell, Bluetooth, Volume2, Shield, Download, Wifi, Smartphone } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [autoConnect, setAutoConnect] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [lowBatteryAlert, setLowBatteryAlert] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);
  const [highQualityAudio, setHighQualityAudio] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-400">Customize your Nothing X experience</p>
      </div>

      {/* Connection Settings */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bluetooth className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Connection</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto-connect</h4>
              <p className="text-sm text-gray-400">Automatically connect to known devices</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autoConnect}
                onChange={(e) => setAutoConnect(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">High Quality Audio</h4>
              <p className="text-sm text-gray-400">Use LHDC codec when available</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={highQualityAudio}
                onChange={(e) => setHighQualityAudio(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Notifications</h4>
              <p className="text-sm text-gray-400">Show connection and battery alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Low Battery Alert</h4>
              <p className="text-sm text-gray-400">Alert when battery is below 20%</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={lowBatteryAlert}
                onChange={(e) => setLowBatteryAlert(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Updates */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Download className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Updates</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Updates</h4>
              <p className="text-sm text-gray-400">Download firmware updates automatically</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autoUpdates}
                onChange={(e) => setAutoUpdates(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          
          <button className="w-full flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
            <Download className="w-4 h-4" />
            <span>Check for Updates</span>
          </button>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Privacy & Security</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
            <h4 className="font-medium">Clear Device Data</h4>
            <p className="text-sm text-gray-400">Remove all stored device information</p>
          </button>
          
          <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
            <h4 className="font-medium">Privacy Policy</h4>
            <p className="text-sm text-gray-400">View our privacy policy</p>
          </button>
          
          <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
            <h4 className="font-medium">Terms of Service</h4>
            <p className="text-sm text-gray-400">Read our terms of service</p>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Version</span>
            <span>1.2.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Build</span>
            <span>2024.01.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Platform</span>
            <span>Windows 11</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <span className="text-sm">Nothing Technology Limited</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;