import React from 'react';
import { Search, Bluetooth, Battery, Headphones, Smartphone, Speaker } from 'lucide-react';
import { Device } from '../App';

interface DeviceListProps {
  devices: Device[];
  isScanning: boolean;
  onScan: () => void;
  onDeviceSelect: (device: Device) => void;
  onDeviceConnect: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  isScanning,
  onScan,
  onDeviceSelect,
  onDeviceConnect
}) => {
  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'ear':
        return <Headphones className="w-6 h-6" />;
      case 'phone':
        return <Smartphone className="w-6 h-6" />;
      case 'cmf':
        return <Speaker className="w-6 h-6" />;
      default:
        return <Bluetooth className="w-6 h-6" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Devices</h2>
        <button
          onClick={onScan}
          disabled={isScanning}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 rounded-lg backdrop-blur-xl transition-all"
        >
          <Search className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Scan'}</span>
        </button>
      </div>

      <div className="grid gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => onDeviceSelect(device)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${device.isConnected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{device.name}</h3>
                  <p className="text-gray-400 text-sm">{device.model}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${device.isConnected ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                    <span className="text-xs text-gray-500">
                      {device.isConnected ? 'Connected' : 'Available'} • {device.audioCodec}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {device.batteryLeft !== undefined && (
                  <div className="flex items-center space-x-3">
                    {device.batteryRight !== undefined && (
                      <div className="flex items-center space-x-1">
                        <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLeft)}`} />
                        <span className={`text-sm ${getBatteryColor(device.batteryLeft)}`}>
                          {device.batteryLeft}%
                        </span>
                      </div>
                    )}
                    {device.batteryRight !== undefined && (
                      <div className="flex items-center space-x-1">
                        <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryRight)}`} />
                        <span className={`text-sm ${getBatteryColor(device.batteryRight)}`}>
                          {device.batteryRight}%
                        </span>
                      </div>
                    )}
                    {device.batteryCase !== undefined && (
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
                          <div className="w-1 h-1 bg-current rounded-full"></div>
                        </div>
                        <span className={`text-sm ${getBatteryColor(device.batteryCase)}`}>
                          {device.batteryCase}%
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeviceConnect(device.id);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    device.isConnected
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {device.isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-12">
          <Bluetooth className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No devices found</h3>
          <p className="text-gray-600">Make sure your Nothing devices are in pairing mode</p>
        </div>
      )}
    </div>
  );
};

export default DeviceList;