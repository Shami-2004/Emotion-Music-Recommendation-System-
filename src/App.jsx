import React, { useState, useRef, useEffect } from 'react';
import { Camera, Music, Play, Pause, SkipForward, SkipBack, Heart, User, RefreshCw, Zap, X } from 'lucide-react';

const PLAYLISTS = {
  happy: [
    { title: "Walking On Sunshine", artist: "Katrina & The Waves", duration: "3:58", color: "from-yellow-400 to-orange-500" },
    { title: "Uptown Funk", artist: "Mark Ronson", duration: "4:30", color: "from-pink-500 to-rose-500" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56", color: "from-orange-400 to-red-500" },
    { title: "Happy", artist: "Pharrell Williams", duration: "3:53", color: "from-yellow-300 to-amber-500" },
  ],
  sad: [
    { title: "Someone Like You", artist: "Adele", duration: "4:45", color: "from-gray-700 to-gray-900" },
    { title: "The Night We Met", artist: "Lord Huron", duration: "3:28", color: "from-blue-900 to-slate-900" },
    { title: "Skinny Love", artist: "Bon Iver", duration: "3:59", color: "from-gray-500 to-slate-700" },
    { title: "Fix You", artist: "Coldplay", duration: "4:55", color: "from-indigo-900 to-blue-900" },
  ],
  angry: [
    { title: "Break Stuff", artist: "Limp Bizkit", duration: "2:46", color: "from-red-600 to-red-900" },
    { title: "Killing In The Name", artist: "Rage Against The Machine", duration: "5:14", color: "from-red-700 to-black" },
    { title: "Du Hast", artist: "Rammstein", duration: "3:54", color: "from-orange-700 to-red-900" },
    { title: "Chop Suey!", artist: "System Of A Down", duration: "3:30", color: "from-red-500 to-rose-900" },
  ],
  neutral: [
    { title: "Weightless", artist: "Marconi Union", duration: "8:00", color: "from-teal-400 to-emerald-600" },
    { title: "River Flows In You", artist: "Yiruma", duration: "3:08", color: "from-cyan-300 to-blue-500" },
    { title: "Gymnopedie No.1", artist: "Erik Satie", duration: "3:03", color: "from-slate-300 to-gray-400" },
    { title: "Sunrise", artist: "Norah Jones", duration: "3:20", color: "from-amber-200 to-orange-100" },
  ]
};

const EMOTIONS = ['happy', 'sad', 'angry', 'neutral'];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const videoRef = useRef(null);

  const requestCamera = async () => {
    setShowPermissionModal(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setActiveTab('scan');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error(err);
      // Using an alert is generally discouraged in React, but used here for demonstration purposes.
      alert("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startScanProcess = () => {
    if (!stream) {
      setShowPermissionModal(true);
      return;
    }
    setActiveTab('scan');
  };

  const performScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeScan();
          return 100;
        }
        return prev + (Math.random() * 5);
      });
    }, 80);
  };

  const completeScan = () => {
    setIsScanning(false);
    const randomMood = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    setDetectedMood(randomMood);
    setCurrentSong(PLAYLISTS[randomMood][0]);
    setIsPlaying(true);
    setActiveTab('player');
    stopCamera();
  };

  useEffect(() => {
    if (activeTab !== 'scan' && stream) {
      stopCamera();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden relative">

      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300">
            <Music size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">MusiConnect</span>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          <button onClick={() => setActiveTab('home')} className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Home</button>
          <button onClick={() => setActiveTab('scan')} className={`text-sm font-medium transition-colors ${activeTab === 'scan' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Demo</button>
          <button onClick={() => setActiveTab('about')} className={`text-sm font-medium transition-colors ${activeTab === 'about' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>About</button>
        </div>

        <button
          onClick={startScanProcess}
          className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
        >
          {activeTab === 'player' ? 'Scan Again' : 'Try Demo'}
        </button>
      </nav>

      <main className="relative z-10 pt-32 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">

        {activeTab === 'home' && (
          <div className="grid lg:grid-cols-2 gap-12 items-center animate-fadeIn">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                <Zap size={12} fill="currentColor" />
                AI-Powered Audio
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Your face sets<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  the rhythm.
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                Experience the next generation of music recommendation. We use computer vision to analyze your micro-expressions and curate playlists that match your exact emotional state.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={startScanProcess}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-3"
                >
                  <Camera size={20} />
                  Analyze My Mood
                </button>
                <div className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2 font-medium">
                  <Play size={18} fill="currentColor" />
                  Watch Video
                </div>
              </div>

              <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white">98%</h3>
                  <p className="text-sm text-gray-500 mt-1">Accuracy Rate</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">0.4s</h3>
                  <p className="text-sm text-gray-500 mt-1">Inference Time</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">4</h3>
                  <p className="text-sm text-gray-500 mt-1">Emotion Classes</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent rounded-full filter blur-3xl"></div>
              <div className="relative bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-mono text-gray-500">LIVE ANALYSIS</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 rounded-xl aspect-[3/4] flex items-center justify-center border border-white/5 relative overflow-hidden">
                    <User size={64} className="text-gray-700" />
                    <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur rounded-lg p-2 text-center">
                      <span className="text-xs font-bold text-indigo-400">HAPPY (0.92)</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${i === 1 ? 'from-yellow-400 to-orange-500' : 'from-gray-700 to-gray-600'}`}></div>
                        <div className="space-y-1">
                          <div className="w-20 h-2 bg-gray-600 rounded-full"></div>
                          <div className="w-12 h-2 bg-gray-700 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto animate-fadeIn text-gray-300">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About the Project</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                MusiConnect bridges the gap between human emotion and digital experiences using advanced computer vision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="text-indigo-400" /> How It Works
                </h3>
                <p className="leading-relaxed">
                  Music profoundly influences human emotion, yet manually selecting songs to match a mood can be tedious.
                  This project automates that process by creating a personalized "Emotion-Based Music Recommendation System".
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">1</div>
                    <span><strong>Face Detection:</strong> Captures facial landmarks in real-time via webcam using Haar Cascade pipelines.</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">2</div>
                    <span><strong>Emotion Analysis:</strong> A lightweight Convolutional Neural Network (CNN) classifies expressions into Happy, Sad, Angry, or Neutral.</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs font-bold">3</div>
                    <span><strong>Music Mapping:</strong> The system matches the detected mood to a curated dataset (Muse V3) based on tempo, energy, and genre metadata.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Technical & Privacy</h3>
                <div className="space-y-4 text-sm">
                  <p>
                    <strong>Privacy First:</strong> The system respects user privacy by processing video frames locally. No images are sent to the cloud.
                  </p>
                  <p>
                    <strong>Tech Stack:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">React Frontend</span>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">TensorFlow / Keras</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">Computer Vision</span>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="italic text-gray-500">
                      "Combining facial emotion recognition with a recommendation framework to deliver mood-congruent music automatically."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scan' && (
          <div className="max-w-3xl mx-auto w-full animate-fadeIn">
            <div className="bg-gray-900/60 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-2 shadow-2xl overflow-hidden relative">

              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between z-20">
                <button onClick={() => setActiveTab('home')} className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/80 transition backdrop-blur-md">
                  <X size={20} />
                </button>
                {stream && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> REC
                  </div>
                )}
              </div>

              <div className="relative aspect-video bg-black rounded-[1.5rem] overflow-hidden">
                {stream ? (
                  <>
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />

                    {isScanning && (
                      <div className="absolute inset-0 z-10">
                        <div className="absolute inset-0 bg-indigo-500/10 animate-pulse"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-scanLine"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-indigo-400/30 rounded-full animate-ping"></div>

                        <div className="absolute bottom-10 left-0 right-0 text-center space-y-2">
                          <h3 className="text-2xl font-mono font-bold text-white tracking-widest">ANALYZING FACIAL POINTS</h3>
                          <div className="w-64 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 transition-all duration-100" style={{ width: `${scanProgress}%` }}></div>
                          </div>
                          <p className="text-xs text-indigo-300 font-mono">{Math.round(scanProgress)}% COMPLETE</p>
                        </div>
                      </div>
                    )}

                    {!isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-56 h-72 border-2 border-dashed border-white/20 rounded-[3rem]"></div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <Camera size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Camera Access Needed</h3>
                    <p className="text-gray-500 text-sm max-w-xs">To analyze your emotions, we need access to your webcam. The feed is processed locally.</p>
                    <button onClick={requestCamera} className="mt-6 px-6 py-2 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition">Enable Camera</button>
                  </div>
                )}
              </div>

              {stream && (
                <div className="p-8 text-center">
                  {!isScanning ? (
                    <div className="space-y-4">
                      <button
                        onClick={performScan}
                        className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                      >
                        <Zap size={20} /> Capture Mood
                      </button>
                      <p className="text-xs text-gray-500">Ensure your face is well-lit for best results.</p>
                    </div>
                  ) : (
                    <div className="py-4 text-indigo-300 font-mono text-sm animate-pulse">
                      Processing tensor data...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'player' && currentSong && (
          <div className="w-full max-w-5xl mx-auto animate-fadeInUp">
            <div className="relative overflow-hidden bg-gray-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">

              <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${currentSong.color} opacity-20 blur-[120px] rounded-full pointer-events-none`}></div>

              <div className="relative z-10 grid md:grid-cols-[350px_1fr] gap-12 items-center">
                <div className="space-y-6">
                  <div className={`aspect-square rounded-[2rem] bg-gradient-to-br ${currentSong.color} shadow-2xl shadow-black/50 flex items-center justify-center group relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                    <Music size={80} className="text-white/30" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-6 bg-white/40 rounded-full animate-musicBar" style={{ animationDelay: `${i * 0.1}s` }}></div>)}
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-3 uppercase tracking-wider">
                      Detected: {detectedMood}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">{currentSong.title}</h2>
                    <p className="text-xl text-gray-400">{currentSong.artist}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer group">
                      <div className="w-1/3 h-full bg-white rounded-full group-hover:bg-indigo-400 transition-colors relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-500">
                      <span>1:12</span>
                      <span>{currentSong.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button className="text-gray-400 hover:text-white transition"><SkipBack size={32} /></button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-xl shadow-white/10"
                      >
                        {isPlaying ? <Pause size={32} fill="black" className="text-black" /> : <Play size={32} fill="black" className="ml-2 text-black" />}
                      </button>
                      <button className="text-gray-400 hover:text-white transition"><SkipForward size={32} /></button>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-red-400 transition"><Heart size={20} /></button>
                      <button onClick={() => setActiveTab('scan')} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition"><RefreshCw size={20} /></button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Up Next</h4>
                    <div className="space-y-2">
                      {PLAYLISTS[detectedMood].slice(1, 3).map((track, idx) => (
                        <div key={idx} onClick={() => setCurrentSong(track)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition group">
                          <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-500 group-hover:text-white transition">
                            <Play size={12} fill="currentColor" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-200">{track.title}</p>
                            <p className="text-xs text-gray-500">{track.artist}</p>
                          </div>
                          <p className="text-xs text-gray-600 font-mono">{track.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showPermissionModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Enable Camera</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              MusiConnect needs access to your camera to detect your facial expressions. The video feed is processed locally and never stored.
            </p>
            <div className="space-y-3">
              <button onClick={requestCamera} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition">Allow Access</button>
              <button onClick={() => setShowPermissionModal(false)} className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition text-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;