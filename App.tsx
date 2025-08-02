import React, { useState, useEffect } from 'react';
import { Bluetooth, Battery, Volume2, Settings, Wifi, Download, Search, Power } from 'lucide-react';
import DeviceList from './components/DeviceList';
import DeviceControl from './components/DeviceControl';
import Equalizer from './components/Equalizer';
import SettingsPanel from './components/SettingsPanel';
import ConnectionStatus from './components/ConnectionStatus';

export interface Device {
  id: string;
  name: string;
  type: 'ear' | 'phone' | 'cmf';
  model: string;
  batteryLeft?: number;
  batteryRight?: number;
  batteryCase?: number;
  isConnected: boolean;
  hasANC: boolean;
  hasTransparency: boolean;
  hasFindMy: boolean;
  hasDualConnection: boolean;
  firmwareVersion: string;
  audioCodec: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'devices' | 'control' | 'equalizer' | 'settings'>('devices');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Nothing Ear (2)',
      type: 'ear',
      model: 'Ear (2)',
      batteryLeft: 85,
      batteryRight: 82,
      batteryCase: 67,
      isConnected: true,
      hasANC: true,
      hasTransparency: true,
      hasFindMy: true,
      hasDualConnection: true,
      firmwareVersion: '1.2.4',
      audioCodec: 'LHDC'
    },
    {
      id: '2',
      name: 'Nothing Phone (2)',
      type: 'phone',
      model: 'Phone (2)',
      batteryLeft: 78,
      isConnected: false,
      hasANC: false,
      hasTransparency: false,
      hasFindMy: false,
      hasDualConnection: false,
      firmwareVersion: '2.5.1',
      audioCodec: 'AAC'
    }
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setActiveTab('control');
  };

  const connectedDevice = devices.find(d => d.isConnected);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-mono">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/20 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold">Nothing X</h1>
            </div>
            <ConnectionStatus device={connectedDevice} />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <nav className="w-64 bg-black/10 backdrop-blur-xl border-r border-gray-800">
          <div className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('devices')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'devices'
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Bluetooth className="w-5 h-5" />
                <span>Devices</span>
              </button>
              
              <button
                onClick={() => setActiveTab('control')}
                disabled={!connectedDevice}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'control'
                    ? 'bg-white text-black'
                    : connectedDevice
                    ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>Control</span>
              </button>
              
              <button
                onClick={() => setActiveTab('equalizer')}
                disabled={!connectedDevice}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'equalizer'
                    ? 'bg-white text-black'
                    : connectedDevice
                    ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <Wifi className="w-5 h-5" />
                <span>Equalizer</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'settings'
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'devices' && (
              <DeviceList
                devices={devices}
                isScanning={isScanning}
                onScan={handleScan}
                onDeviceSelect={handleDeviceSelect}
                onDeviceConnect={(deviceId) => {
                  setDevices(prev => prev.map(d => ({
                    ...d,
                    isConnected: d.id === deviceId ? !d.isConnected : false
                  })));
                }}
              />
            )}
            
            {activeTab === 'control' && connectedDevice && (
              <DeviceControl device={connectedDevice} />
            )}
            
            {activeTab === 'equalizer' && connectedDevice && (
              <Equalizer device={connectedDevice} />
            )}
            
            {activeTab === 'settings' && (
              <SettingsPanel />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;