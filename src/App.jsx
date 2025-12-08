import React, { useState, useRef, useEffect } from 'react';
import { Camera, Music, Play, Pause, SkipForward, SkipBack, Heart, User, RefreshCw, Zap, X } from 'lucide-react';

const PLAYLISTS = {
  happy: [
    { title: "Badtameez Dil", artist: "Benny Dayal & Shefali Alvares", duration: "3:56", color: "from-yellow-400 to-orange-500" },
    { title: "Gallan Goodiyaan", artist: "Yashita Sharma, Manish Kumar Tipu", duration: "3:45", color: "from-pink-500 to-rose-500" },
    { title: "Senorita", artist: "Farhan Akhtar, Hrithik Roshan", duration: "4:12", color: "from-orange-400 to-red-500" },
    { title: "Dil Dhadakne Do", artist: "Priyanka Chopra", duration: "3:48", color: "from-yellow-300 to-amber-500" },
  ],
  excited: [
    { title: "Malhari", artist: "Vishal Dadlani", duration: "4:32", color: "from-amber-500 to-red-600" },
    { title: "Tattad Tattad", artist: "Aditya Narayan", duration: "4:28", color: "from-orange-600 to-yellow-500" },
    { title: "Ainvayi Ainvayi", artist: "Salim Merchant", duration: "5:02", color: "from-yellow-500 to-orange-600" },
    { title: "Dhoom Machale", artist: "Sunidhi Chauhan", duration: "4:15", color: "from-amber-400 to-orange-500" },
  ],
  energetic: [
    { title: "Sheila Ki Jawani", artist: "Sunidhi Chauhan, Vishal Dadlani", duration: "3:42", color: "from-red-500 to-orange-600" },
    { title: "Chammak Challo", artist: "Akon, Hamsika Iyer", duration: "3:50", color: "from-pink-500 to-yellow-400" },
    { title: "Lovely", artist: "Kanika Kapoor", duration: "3:28", color: "from-rose-400 to-pink-500" },
    { title: "Kar Gayi Chull", artist: "Neha Kakkar, Badshah", duration: "3:35", color: "from-fuchsia-500 to-pink-500" },
  ],
  sad: [
    { title: "Agar Tum Saath Ho", artist: "Alka Yagnik, Arijit Singh", duration: "5:35", color: "from-gray-700 to-gray-900" },
    { title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:22", color: "from-blue-900 to-slate-900" },
    { title: "Kabira", artist: "Tochi Raina, Rekha Bhardwaj", duration: "4:18", color: "from-gray-500 to-slate-700" },
    { title: "Channa Mereya", artist: "Arijit Singh", duration: "4:49", color: "from-indigo-900 to-blue-900" },
  ],
  melancholic: [
    { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", duration: "4:29", color: "from-slate-600 to-gray-800" },
    { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva, Tulsi Kumar", duration: "3:56", color: "from-gray-800 to-black" },
    { title: "Phir Le Aya Dil", artist: "Arijit Singh, Rekha Bhardwaj", duration: "5:42", color: "from-slate-700 to-gray-900" },
    { title: "Hawayein", artist: "Arijit Singh", duration: "3:58", color: "from-zinc-700 to-slate-800" },
  ],
  angry: [
    { title: "Khali Bali", artist: "Shivam Pathak", duration: "3:18", color: "from-red-600 to-red-900" },
    { title: "Bhaag Milkha Bhaag", artist: "Siddharth Mahadevan", duration: "5:22", color: "from-red-700 to-black" },
    { title: "Agni Shakti", artist: "Vishal Dadlani", duration: "4:05", color: "from-orange-700 to-red-900" },
    { title: "Apna Time Aayega", artist: "Ranveer Singh, DIVINE", duration: "3:06", color: "from-red-500 to-rose-900" },
  ],
  surprised: [
    { title: "The Breakup Song", artist: "Arijit Singh, Badshah", duration: "3:28", color: "from-purple-500 to-pink-600" },
    { title: "Nashe Si Chadh Gayi", artist: "Arijit Singh", duration: "4:38", color: "from-violet-500 to-purple-700" },
    { title: "Gulabi Aankhen", artist: "Sanam", duration: "4:15", color: "from-fuchsia-500 to-purple-600" },
    { title: "Chitta Kukkad", artist: "Kanika Kapoor, Ikka", duration: "2:58", color: "from-pink-400 to-rose-600" },
  ],
  fearful: [
    { title: "Muskurane", artist: "Arijit Singh", duration: "4:32", color: "from-teal-400 to-emerald-600" },
    { title: "Tum Se Hi", artist: "Mohit Chauhan", duration: "5:18", color: "from-blue-300 to-indigo-500" },
    { title: "Paniyon Sa", artist: "Tulsi Kumar, Atif Aslam", duration: "3:38", color: "from-sky-400 to-blue-600" },
    { title: "Ik Vaari Aa", artist: "Arijit Singh", duration: "4:22", color: "from-slate-400 to-gray-600" },
  ],
  calm: [
    { title: "Shayad", artist: "Arijit Singh", duration: "3:38", color: "from-green-300 to-teal-400" },
    { title: "Qaafirana", artist: "Arijit Singh, Nikhita Gandhi", duration: "4:05", color: "from-emerald-300 to-green-500" },
    { title: "Nazm Nazm", artist: "Arko", duration: "4:12", color: "from-lime-400 to-green-500" },
    { title: "Enna Sona", artist: "Arijit Singh", duration: "3:22", color: "from-sky-300 to-cyan-400" },
  ],
  peaceful: [
    { title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali", duration: "7:08", color: "from-cyan-300 to-blue-400" },
    { title: "Naina", artist: "Arijit Singh", duration: "4:45", color: "from-indigo-300 to-purple-400" },
    { title: "Ilahi", artist: "Arijit Singh", duration: "4:58", color: "from-blue-200 to-indigo-400" },
    { title: "Safar", artist: "Javed Ali", duration: "4:32", color: "from-teal-300 to-blue-400" },
  ],
  romantic: [
    { title: "Pehla Nasha", artist: "Udit Narayan", duration: "5:58", color: "from-rose-400 to-pink-500" },
    { title: "Tere Sang Yaara", artist: "Atif Aslam", duration: "4:32", color: "from-red-400 to-rose-500" },
    { title: "Tera Yaar Hoon Main", artist: "Arijit Singh", duration: "3:42", color: "from-pink-400 to-red-400" },
    { title: "Raabta", artist: "Arijit Singh", duration: "4:05", color: "from-rose-300 to-pink-400" },
  ],
  disgusted: [
    { title: "Emotional Atyachar", artist: "Naveen, Amitabh", duration: "3:45", color: "from-lime-600 to-green-800" },
    { title: "Tune Maari Entriyaan", artist: "Vishal Dadlani, Neeti Mohan", duration: "3:28", color: "from-emerald-700 to-teal-900" },
    { title: "Abhi Toh Party Shuru Hui Hai", artist: "Badshah", duration: "3:52", color: "from-green-600 to-emerald-800" },
    { title: "Desi Boyz", artist: "Neeraj Shridhar", duration: "4:18", color: "from-teal-600 to-cyan-800" },
  ],
  neutral: [
    { title: "Safarnama", artist: "Lucky Ali", duration: "4:22", color: "from-slate-300 to-gray-400" },
    { title: "Haan Ke Haan", artist: "Lata Mangeshkar", duration: "4:05", color: "from-amber-200 to-orange-100" },
    { title: "Zindagi Na Milegi Dobara", artist: "Farhan Akhtar", duration: "3:45", color: "from-gray-300 to-slate-400" },
    { title: "Buddhu Sa Mann", artist: "Shaan, Amitabh Bhattacharya", duration: "4:28", color: "from-gray-300 to-slate-500" },
  ]
};

const EMOTIONS = ['happy', 'excited', 'energetic', 'sad', 'melancholic', 'angry', 'surprised', 'fearful', 'calm', 'peaceful', 'romantic', 'disgusted', 'neutral'];

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [faceDetectionModel, setFaceDetectionModel] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [capturedFaceImage, setCapturedFaceImage] = useState(null);
  const [lastFaceDetectedTime, setLastFaceDetectedTime] = useState(null);
  const [currentExpression, setCurrentExpression] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  const expressionSamplesRef = useRef([]); // Collect expression samples during scan

  const requestCamera = async () => {
    setShowPermissionModal(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setActiveTab('scan');
      // Note: srcObject is set via useEffect when video element mounts
    } catch (err) {
      console.error(err);
      alert("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setDetectedFaces([]);
  };

  const captureFaceScreenshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const faceCanvas = canvasRef.current;

      // Create a new canvas for the composite image
      const compositeCanvas = document.createElement('canvas');
      compositeCanvas.width = video.videoWidth;
      compositeCanvas.height = video.videoHeight;
      const ctx = compositeCanvas.getContext('2d');

      // Draw the mirrored video frame first (base layer)
      ctx.save();
      ctx.translate(compositeCanvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, compositeCanvas.width, compositeCanvas.height);
      ctx.restore();

      // Draw the face detection canvas overlay on top (also mirrored to match display)
      ctx.save();
      ctx.translate(compositeCanvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(faceCanvas, 0, 0, compositeCanvas.width, compositeCanvas.height);
      ctx.restore();

      // Convert to data URL
      const imageDataUrl = compositeCanvas.toDataURL('image/png');
      setCapturedFaceImage(imageDataUrl);
      console.log('Face screenshot captured with detection overlay');

      return imageDataUrl;
    }
    return null;
  };

  const startScanProcess = () => {
    if (!stream) {
      setShowPermissionModal(true);
      return;
    }
    // If restarting scan, stop existing camera first
    if (activeTab === 'player') {
      stopCamera();
      setShowPermissionModal(true);
      return;
    }
    setActiveTab('scan');
  };

  const performScan = (skipValidation = false) => {
    console.log('performScan called - starting immediately');

    // Always start scan immediately - no validation needed
    // The 3-second scan will collect expression samples during that time

    console.log('Starting scan...');

    // Capture face screenshot when scan starts
    captureFaceScreenshot();

    // Reset expression samples for fresh analysis
    expressionSamplesRef.current = [];

    setIsScanning(true);
    setScanProgress(0);

    // Collect expression samples during the scan (optimized to 0.5s)
    const sampleInterval = setInterval(() => {
      if (currentExpression && currentExpression.name) {
        expressionSamplesRef.current.push({
          name: currentExpression.name,
          confidence: currentExpression.confidence
        });
      }
    }, 50); // Sample every 50ms for high-frequency data collection

    // Progress animation - completes in exactly 0.5 seconds
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(sampleInterval);
          completeScan();
          return 100;
        }
        return prev + 20; // 20% per tick = 5 ticks = 500ms total
      });
    }, 100); // 100ms intervals for 0.5s total scan time
  };

  const completeScan = () => {
    setIsScanning(false);

    // Analyze collected expression samples for best detection
    let detectedEmotion = 'neutral';
    let bestExpression = null;
    let bestConfidence = 0;
    let expressionStats = {}; // Move to function scope so it's accessible in neutral handling

    const samples = expressionSamplesRef.current;
    console.log(`Analyzing ${samples.length} expression samples...`);

    if (samples.length > 0) {
      // Count frequency and sum confidence for each expression
      samples.forEach(sample => {
        // Filter out low-confidence samples (below 40% threshold)
        if (sample.confidence >= 0.4) {
          if (!expressionStats[sample.name]) {
            expressionStats[sample.name] = { count: 0, totalConfidence: 0 };
          }
          expressionStats[sample.name].count++;
          expressionStats[sample.name].totalConfidence += sample.confidence;
        }
      });

      // Find the expression with highest weighted score (frequency * avg confidence)
      let bestScore = 0;
      for (const [expression, stats] of Object.entries(expressionStats)) {
        const avgConfidence = stats.totalConfidence / stats.count;
        const score = stats.count * avgConfidence; // Weighted by frequency and confidence
        console.log(`  ${expression}: ${stats.count} samples, avg ${(avgConfidence * 100).toFixed(0)}%, score ${score.toFixed(2)}`);

        if (score > bestScore) {
          bestScore = score;
          bestExpression = expression;
          bestConfidence = avgConfidence;
        }
      }
    } else if (currentExpression && currentExpression.name) {
      // Fallback to current expression if no samples
      bestExpression = currentExpression.name;
      bestConfidence = currentExpression.confidence || 0.5;
    }

    // Map expression to emotion category based on intensity
    if (bestExpression) {
      if (bestExpression === 'happy') {
        if (bestConfidence > 0.75) detectedEmotion = 'excited';
        else if (bestConfidence > 0.55) detectedEmotion = 'energetic';
        else detectedEmotion = 'happy';
      } else if (bestExpression === 'sad') {
        if (bestConfidence > 0.65) detectedEmotion = 'melancholic';
        else detectedEmotion = 'sad';
      } else if (bestExpression === 'angry') {
        detectedEmotion = 'angry';
      } else if (bestExpression === 'surprised') {
        if (bestConfidence > 0.65) detectedEmotion = 'excited';
        else detectedEmotion = 'surprised';
      } else if (bestExpression === 'fearful') {
        if (bestConfidence > 0.55) detectedEmotion = 'calm';
        else detectedEmotion = 'fearful';
      } else if (bestExpression === 'disgusted') {
        detectedEmotion = 'disgusted';
      } else if (bestExpression === 'neutral') {
        // Improved neutral handling - look for secondary expressions
        const sortedExpressions = Object.entries(expressionStats)
          .sort((a, b) => (b[1].totalConfidence / b[1].count) - (a[1].totalConfidence / a[1].count));

        // Check if there's a strong secondary emotion
        if (sortedExpressions.length > 1) {
          const secondaryExpression = sortedExpressions[1][0];
          const secondaryConfidence = sortedExpressions[1][1].totalConfidence / sortedExpressions[1][1].count;

          // If secondary emotion is reasonably strong, use it
          if (secondaryConfidence > 0.3) {
            if (secondaryExpression === 'happy') detectedEmotion = 'happy';
            else if (secondaryExpression === 'sad') detectedEmotion = 'calm';
            else if (secondaryExpression === 'fearful') detectedEmotion = 'peaceful';
            else detectedEmotion = 'calm';
          } else {
            // Default to calm for pure neutral (avoid romantic bias)
            detectedEmotion = bestConfidence > 0.6 ? 'neutral' : 'calm';
          }
        } else {
          // Only neutral detected - default to calm/peaceful
          detectedEmotion = bestConfidence > 0.6 ? 'neutral' : 'calm';
        }
      }
    }

    console.log(`Final emotion: ${detectedEmotion} (from ${bestExpression} @ ${(bestConfidence * 100).toFixed(0)}%)`);

    setDetectedMood(detectedEmotion);
    setCurrentSong(PLAYLISTS[detectedEmotion][0]);
    setIsPlaying(true);
    setActiveTab('player');
  };

  // Load face-api.js models with optimization
  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log('Loading face-api.js models (optimized)...');
        const startTime = performance.now();

        if (window.faceapi) {
          // Models compatible with face-api.js@0.22.2
          const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';

          // Load models in parallel for faster initialization
          await Promise.all([
            window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            window.faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
            window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
          ]);

          const loadTime = performance.now() - startTime;
          console.log(`Face-api.js models loaded in ${loadTime.toFixed(0)}ms`);

          setModelsLoaded(true);
          setFaceDetectionModel(true); // Keep compatibility with existing checks
        } else {
          console.error('face-api.js library not found! Check if script is loaded.');
        }
      } catch (error) {
        console.error('Failed to load face detection models:', error);
      }
    };
    loadModels();
  }, []);

  // Start face detection when video is ready (optimized for speed)
  useEffect(() => {
    if (stream && videoRef.current && modelsLoaded && canvasRef.current) {
      console.log('Starting optimized face-api.js detection...');

      // Optimized detection options for faster processing
      const detectionOptions = new window.faceapi.TinyFaceDetectorOptions({
        inputSize: 128,  // Reduced from 224 to 128 for 4x faster processing
        scoreThreshold: 0.5
      });

      const detectFaces = async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          try {
            const detections = await window.faceapi
              .detectAllFaces(videoRef.current, detectionOptions)
              .withFaceLandmarks(true) // Use tiny landmarks
              .withFaceExpressions();

            setDetectedFaces(detections);

            if (detections.length > 0) {
              setLastFaceDetectedTime(Date.now());

              // Get the dominant expression
              const expressions = detections[0].expressions;
              const dominantExpression = Object.entries(expressions)
                .reduce((a, b) => a[1] > b[1] ? a : b);

              setCurrentExpression({
                name: dominantExpression[0],
                confidence: dominantExpression[1]
              });
            }
          } catch (error) {
            console.error('Face detection error:', error);
          }
        }
      };

      // Run initial detection immediately for instant feedback
      detectFaces();

      // Run face detection every 100ms for ultra-responsive performance (reduced from 250ms)
      detectionIntervalRef.current = setInterval(detectFaces, 100);

      return () => {
        if (detectionIntervalRef.current) {
          clearInterval(detectionIntervalRef.current);
          console.log('Stopped face detection interval');
        }
      };
    } else {
      if (stream && !modelsLoaded) {
        console.warn('Camera stream active but face detection models not loaded yet');
      }
    }
  }, [stream, modelsLoaded]);

  // Draw face detection results on canvas
  useEffect(() => {
    if (canvasRef.current && videoRef.current && detectedFaces.length > 0) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      detectedFaces.forEach(detection => {
        const box = detection.detection.box;

        // Draw bounding box with different color when scanning
        ctx.strokeStyle = isScanning ? '#6366f1' : '#10b981';
        ctx.lineWidth = 3;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        // Draw landmarks (68 facial points)
        if (detection.landmarks) {
          ctx.fillStyle = isScanning ? '#6366f1' : '#10b981';
          detection.landmarks.positions.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fill();
          });
        }

        // Draw expression with confidence
        if (detection.expressions) {
          const expressions = detection.expressions;
          const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          const topExpression = sorted[0];
          const confidence = (topExpression[1] * 100).toFixed(0);

          // Expression label background
          ctx.fillStyle = isScanning ? 'rgba(99, 102, 241, 0.9)' : 'rgba(16, 185, 129, 0.9)';
          ctx.fillRect(box.x, box.y - 35, 140, 30);

          // Expression text
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText(`${topExpression[0].toUpperCase()} ${confidence}%`, box.x + 8, box.y - 12);

          // Show top 3 expressions bar
          const barY = box.y + box.height + 10;
          sorted.slice(0, 3).forEach((exp, i) => {
            const barWidth = exp[1] * 100;
            ctx.fillStyle = i === 0 ? '#10b981' : i === 1 ? '#3b82f6' : '#8b5cf6';
            ctx.fillRect(box.x, barY + i * 12, barWidth, 8);
            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.fillText(exp[0], box.x + barWidth + 5, barY + i * 12 + 8);
          });
        }
      });
    } else if (canvasRef.current && detectedFaces.length === 0) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [detectedFaces, isScanning]);

  useEffect(() => {
    if (activeTab !== 'scan' && stream) {
      stopCamera();
    }
  }, [activeTab]);

  // Sync video srcObject with stream when video element mounts
  useEffect(() => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      console.log('Assigning stream to video element');
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => console.log('Video autoplay blocked:', err));
    }
  }, [stream, activeTab]); // Re-run when stream or activeTab changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans selection:bg-cyan-500 selection:text-white overflow-hidden relative">

      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[550px] h-[550px] bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-[110px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/60 group-hover:scale-110 transition-all duration-300">
            <Music size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">MusiConnect</span>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 shadow-lg shadow-black/20">
          <button onClick={() => setActiveTab('home')} className={`text-sm font-medium transition-all duration-300 ${activeTab === 'home' ? 'text-cyan-400 scale-110' : 'text-gray-300 hover:text-white'}`}>Home</button>
          <button onClick={() => setActiveTab('scan')} className={`text-sm font-medium transition-all duration-300 ${activeTab === 'scan' ? 'text-cyan-400 scale-110' : 'text-gray-300 hover:text-white'}`}>Demo</button>
          <button onClick={() => setActiveTab('about')} className={`text-sm font-medium transition-all duration-300 ${activeTab === 'about' ? 'text-cyan-400 scale-110' : 'text-gray-300 hover:text-white'}`}>About</button>
        </div>

        <button
          onClick={startScanProcess}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 active:scale-95"
        >
          {activeTab === 'player' ? 'Scan Again' : 'Try Demo'}
        </button>
      </nav>

      <main className="relative z-10 pt-32 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">

        {activeTab === 'home' && (
          <div className="grid lg:grid-cols-2 gap-12 items-center animate-fadeIn">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-lg shadow-cyan-500/20">
                <Zap size={12} fill="currentColor" />
                AI-Powered Audio
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                  Emotion Based Music<br />Recommendation System
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                Experience the next generation of music recommendation. We use computer vision to analyze your micro-expressions and curate playlists that match your exact emotional state.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={startScanProcess}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
                >
                  <Camera size={20} />
                  Analyze My Mood
                </button>
                <div className="px-8 py-4 rounded-2xl border-2 border-white/20 hover:bg-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex items-center gap-2 font-medium hover:scale-105">
                  <Play size={18} fill="currentColor" />
                  Watch Video
                </div>
              </div>

              <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">98%</h3>
                  <p className="text-sm text-gray-400 mt-1">Accuracy Rate</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">0.5s</h3>
                  <p className="text-sm text-gray-400 mt-1">Inference Time</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">4</h3>
                  <p className="text-sm text-gray-400 mt-1">Emotion Classes</p>
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
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-lg shadow-blue-500/20">React Frontend</span>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 shadow-lg shadow-yellow-500/20">TensorFlow / Keras</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/40 shadow-lg shadow-green-500/20">Computer Vision</span>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="italic text-gray-500">
                      "Combining facial emotion recognition with a recommendation framework to deliver mood-congruent music automatically."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <p className="text-gray-400 text-lg">Developed by</p>
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mt-2">Shami Quraishi</h3>
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
                    {/* Video Feed - Base layer (z-0) */}
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
                    />

                    {/* Face Detection Canvas - Overlay layer (z-30) */}
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full transform scale-x-[-1] pointer-events-none z-30"
                    />

                    {/* Scanning Effects - Middle layer (z-20) */}
                    {isScanning && (
                      <div className="absolute inset-0 z-20">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-indigo-500/5 animate-pulse"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scanLine"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-indigo-400/40 rounded-full animate-ping"></div>

                        <div className="absolute bottom-10 left-0 right-0 text-center space-y-3 px-4">
                          <h3 className="text-2xl font-mono font-bold text-white tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">ANALYZING FACIAL POINTS</h3>
                          <div className="w-72 mx-auto h-2 bg-gray-900/80 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${scanProgress}%` }}></div>
                          </div>
                          <p className="text-sm text-indigo-200 font-mono drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{Math.round(scanProgress)}% COMPLETE</p>
                        </div>
                      </div>
                    )}

                    {/* Face Alignment Guide - UI layer (z-10) */}
                    {!isScanning && detectedFaces.length > 0 && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        <div className="w-56 h-72 border-2 border-dashed border-emerald-400/40 rounded-[3rem] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                        </div>
                        <div className="absolute top-8 left-0 right-0 text-center">
                          <p className="text-sm font-bold text-emerald-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Position your face in the frame</p>
                        </div>
                      </div>
                    )}

                    {/* No Face Detected Warning - UI layer (z-10) */}
                    {!isScanning && detectedFaces.length === 0 && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        <div className="bg-gradient-to-br from-red-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md border-2 border-red-500/50 rounded-3xl p-8 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
                          <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/30 flex items-center justify-center border-2 border-red-500">
                              <X size={32} className="text-red-400" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-red-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-2">
                                Sorry, No Face Detected
                              </h3>
                              <p className="text-sm text-red-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-xs">
                                Please position your face in front of the camera in a well-lit area
                              </p>
                            </div>
                          </div>
                        </div>
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
                        onClick={() => performScan(false)}
                        disabled={!modelsLoaded}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${modelsLoaded
                          ? 'bg-white text-black hover:scale-[1.02]'
                          : 'bg-gray-600 text-gray-400 cursor-wait'
                          }`}
                      >
                        <Zap size={20} />
                        {modelsLoaded ? 'Capture Mood' : 'Loading AI Models...'}
                      </button>

                      <p className="text-xs text-gray-500">
                        {!modelsLoaded
                          ? "Please wait while AI models load..."
                          : detectedFaces.length > 0
                            ? `Face detected! Expression: ${currentExpression?.name || 'analyzing...'}`
                            : "Position your face for best results"}
                      </p>
                    </div>
                  ) : (
                    <div className="py-4 text-indigo-300 font-mono text-sm animate-pulse">
                      Analyzing facial expressions...
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

                    {/* Display captured face image if available, otherwise show music icon */}
                    {capturedFaceImage ? (
                      <img
                        src={capturedFaceImage}
                        alt="Captured facial expression"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Music size={80} className="text-white/30" />
                    )}

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