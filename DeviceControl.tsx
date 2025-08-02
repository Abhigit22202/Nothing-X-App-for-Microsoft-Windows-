import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Search, Download, Power, RotateCcw } from 'lucide-react';
import { Device } from '../App';

interface DeviceControlProps {
  device: Device;
}

const DeviceControl: React.FC<DeviceControlProps> = ({ device }) => {
  const [ancMode, setAncMode] = useState<'off' | 'anc' | 'transparency'>('anc');
  const [isUpdating, setIsUpdating] = useState(false);
  const [volume, setVolume] = useState(75);

  const handleFirmwareUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 5000);
  };

  const handleFindDevice = () => {
    // Simulate find my device
    console.log('Finding device...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{device.name}</h2>
          <p className="text-gray-400">Connected • {device.audioCodec}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="text-green-400 text-sm">Connected</span>
        </div>
      </div>

      {/* Battery Status */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Battery Status</h3>
        <div className="grid grid-cols-3 gap-4">
          {device.batteryLeft !== undefined && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-t from-green-600 to-green-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-500"
                  style={{ height: `${device.batteryLeft}%` }}
                ></div>
                <span className="relative text-white font-bold text-sm">{device.batteryLeft}%</span>
              </div>
              <p className="text-gray-400 text-sm">Left</p>
            </div>
          )}
          
          {device.batteryRight !== undefined && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-t from-green-600 to-green-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-500"
                  style={{ height: `${device.batteryRight}%` }}
                ></div>
                <span className="relative text-white font-bold text-sm">{device.batteryRight}%</span>
              </div>
              <p className="text-gray-400 text-sm">Right</p>
            </div>
          )}
          
          {device.batteryCase !== undefined && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500"
                  style={{ height: `${device.batteryCase}%` }}
                ></div>
                <span className="relative text-white font-bold text-sm">{device.batteryCase}%</span>
              </div>
              <p className="text-gray-400 text-sm">Case</p>
            </div>
          )}
        </div>
      </div>

      {/* Volume Control */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Volume Control</h3>
        <div className="flex items-center space-x-4">
          <VolumeX className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <Volume2 className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium w-12 text-right">{volume}%</span>
        </div>
      </div>

      {/* ANC Controls */}
      {device.hasANC && (
        <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Noise Control</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setAncMode('off')}
              className={`p-4 rounded-lg text-center transition-all ${
                ancMode === 'off'
                  ? 'bg-white text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Power className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Off</span>
            </button>
            
            <button
              onClick={() => setAncMode('anc')}
              className={`p-4 rounded-lg text-center transition-all ${
                ancMode === 'anc'
                  ? 'bg-white text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <MicOff className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">ANC</span>
            </button>
            
            <button
              onClick={() => setAncMode('transparency')}
              className={`p-4 rounded-lg text-center transition-all ${
                ancMode === 'transparency'
                  ? 'bg-white text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Mic className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Transparency</span>
            </button>
          </div>
        </div>
      )}

      {/* Device Actions */}
      <div className="grid grid-cols-2 gap-4">
        {device.hasFindMy && (
          <button
            onClick={handleFindDevice}
            className="bg-white/10 hover:bg-white/20 border border-gray-800 rounded-xl p-4 text-center transition-all"
          >
            <Search className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Find My Device</span>
          </button>
        )}
        
        <button
          onClick={handleFirmwareUpdate}
          disabled={isUpdating}
          className="bg-white/10 hover:bg-white/20 disabled:bg-white/5 border border-gray-800 rounded-xl p-4 text-center transition-all"
        >
          {isUpdating ? (
            <RotateCcw className="w-6 h-6 mx-auto mb-2 animate-spin" />
          ) : (
            <Download className="w-6 h-6 mx-auto mb-2" />
          )}
          <span className="text-sm font-medium">
            {isUpdating ? 'Updating...' : 'Update Firmware'}
          </span>
        </button>
      </div>

      {/* Firmware Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Device Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Firmware Version</span>
            <span>{device.firmwareVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Audio Codec</span>
            <span>{device.audioCodec}</span>
          </div>
          {device.hasDualConnection && (
            <div className="flex justify-between">
              <span className="text-gray-400">Dual Connection</span>
              <span className="text-green-400">Supported</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceControl;