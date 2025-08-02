import React from 'react';
import { Wifi, WifiOff, Battery } from 'lucide-react';
import { Device } from '../App';

interface ConnectionStatusProps {
  device?: Device;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ device }) => {
  if (!device) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm">No device connected</span>
      </div>
    );
  }

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Wifi className="w-4 h-4 text-green-400" />
        <span className="text-sm text-green-400">{device.name}</span>
      </div>
      
      {device.batteryLeft !== undefined && (
        <div className="flex items-center space-x-2">
          <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLeft)}`} />
          <span className={`text-sm ${getBatteryColor(device.batteryLeft)}`}>
            {device.batteryLeft}%
          </span>
        </div>
      )}
      
      <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
        {device.audioCodec}
      </div>
    </div>
  );
};

export default ConnectionStatus;