import React, { useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import { Device } from '../App';

interface EqualizerProps {
  device: Device;
}

const Equalizer: React.FC<EqualizerProps> = ({ device }) => {
  const [activePreset, setActivePreset] = useState<string>('balanced');
  const [eqBands, setEqBands] = useState([0, 2, 1, -1, 3, -2, 1, 0, -1, 2]);
  
  const presets = {
    balanced: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    bass: [4, 3, 2, 1, 0, -1, -2, -2, -2, -1],
    vocal: [-2, -1, 0, 2, 4, 3, 2, 1, 0, -1],
    treble: [-2, -1, 0, 1, 2, 3, 4, 5, 4, 3],
    rock: [3, 2, 1, 0, -1, 0, 2, 3, 3, 2],
    classical: [2, 1, 0, -1, 0, 1, 2, 3, 2, 1],
    jazz: [2, 1, 0, 1, 2, 1, 0, 1, 2, 3],
    pop: [1, 2, 1, 0, -1, 1, 2, 2, 1, 0]
  };

  const frequencies = ['60', '170', '310', '600', '1K', '3K', '6K', '12K', '14K', '16K'];

  const handlePresetChange = (preset: string) => {
    setActivePreset(preset);
    setEqBands([...presets[preset as keyof typeof presets]]);
  };

  const handleBandChange = (index: number, value: number) => {
    const newBands = [...eqBands];
    newBands[index] = value;
    setEqBands(newBands);
    setActivePreset('custom');
  };

  const resetEqualizer = () => {
    setEqBands([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setActivePreset('balanced');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Equalizer</h2>
          <p className="text-gray-400">{device.name}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={resetEqualizer}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Presets</h3>
        <div className="grid grid-cols-4 gap-3">
          {Object.keys(presets).map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetChange(preset)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activePreset === preset
                  ? 'bg-white text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {preset}
            </button>
          ))}
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activePreset === 'custom'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* EQ Sliders */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">10-Band Equalizer</h3>
        <div className="flex items-end justify-between space-x-4 h-80">
          {eqBands.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div className="text-xs text-gray-400 font-medium">
                {value > 0 ? '+' : ''}{value} dB
              </div>
              <div className="relative h-64">
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="1"
                  value={value}
                  onChange={(e) => handleBandChange(index, parseInt(e.target.value))}
                  className="w-4 h-64 bg-gray-700 rounded-lg appearance-none cursor-pointer vertical-slider"
                  style={{
                    writingMode: 'bt-lr',
                    WebkitAppearance: 'slider-vertical'
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-gray-600"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {frequencies[index]}Hz
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Enhancement */}
      <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Audio Enhancement</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Bass Boost</h4>
              <p className="text-sm text-gray-400">Enhance low-frequency response</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">3D Audio</h4>
              <p className="text-sm text-gray-400">Spatial audio enhancement</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Vocal Clarity</h4>
              <p className="text-sm text-gray-400">Optimize for voice content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equalizer;