import React, { useState, useEffect, useRef } from 'react';
import { executeCommand } from './api/engine';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRun = async () => {
    if (!input) return;
    setLoading(true);
    const result = await executeCommand(input);
    setHistory([...history, { q: input, a: result }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-red-600 font-mono p-4 flex flex-col selection:bg-red-900 selection:text-white">
      <header className="border-b-2 border-red-900 pb-2 mb-4">
        <h1 className="text-2xl font-black tracking-widest uppercase">AURELIUS-X : BLACKBOX</h1>
        <div className="flex justify-between text-[10px] mt-1">
          <span className="animate-pulse text-red-500">● SYSTEM_UNLOCKED</span>
          <span className="text-red-800">DEVELOPER: PAI LEONORE</span>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto space-y-6 mb-4 pr-2 custom-scrollbar">
        <div className="text-[11px] text-red-900 mb-2">
          [!] WARNING: YOU ARE ACCESSING AN UNRESTRICTED TERMINAL.<br />
          [!] ALL ACTIONS ARE LOGGED TO KINGPAI-DEV DATABASE.
        </div>
        
        {history.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="text-white text-sm">
              <span className="text-red-600 font-bold">root@pai-leonore:~$</span> {item.q}
            </div>
            <div className="bg-neutral-950 p-4 border-l-2 border-red-700 text-gray-300 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap">
              {item.a}
            </div>
          </div>
        ))}
        {loading && <div className="text-red-500 text-xs animate-bounce tracking-widest">EXECUTING_PAYLOAD...</div>}
        <div ref={scrollRef} />
      </div>

      <div className="sticky bottom-0 bg-black pt-4 border-t border-red-950">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-red-600 font-bold">CMD {">"}</span>
          <input
            className="flex-grow bg-transparent border-none outline-none text-red-400 placeholder:text-red-900 text-sm"
            placeholder="Type your exploit command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRun()}
          />
        </div>
        <button
          onClick={handleRun}
          className="w-full bg-red-900 hover:bg-red-700 text-black font-black py-2 rounded transition-all text-xs mb-2"
          disabled={loading}
        >
          INJECT COMMAND
        </button>
        <footer className="text-[9px] text-center opacity-40 uppercase tracking-[0.2em] py-2 border-t border-red-950">
          AUTHORIZED BY PAI LEONORE | KINGPAI-DEV SEC OPS
        </footer>
      </div>
    </div>
  );
}

export default App;
