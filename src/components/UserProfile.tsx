import React, { useState, useRef, useEffect } from 'react';
import { Camera, User as UserIcon, Upload, Check, Trash, History, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';
import { LanguageCode, translations } from '../lib/translations';

interface UserProfileProps {
  currentUser: User | null;
  onUpdateProfile: (updatedUser: User) => void;
  language: LanguageCode;
}

export default function UserProfile({ currentUser, onUpdateProfile, language }: UserProfileProps) {
  const t = translations[language];
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [profilePassword, setProfilePassword] = useState(currentUser?.password || '');
  const [confirmProfilePassword, setConfirmProfilePassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  
  // Camera capture states
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Success indicator
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName);
      setAvatarUrl(currentUser.avatarUrl || '');
      setProfilePassword(currentUser.password || '');
      setConfirmProfilePassword('');
      setPasswordErrorMsg('');
    }
  }, [currentUser]);

  // Handle camera stream
  const startCamera = async () => {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 300 } });
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Error starting camera stream:', err);
      setCameraError('Could not gain camera access. Please verify frame permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setAvatarUrl(dataUrl);
        stopCamera();
        
        // Push activity log
        if (currentUser) {
          const updatedActivities = [
            { id: `act_${Date.now()}`, action: 'Snapped a new profile photo via Live Camera', timestamp: new Date().toISOString() },
            ...(currentUser.activities || [])
          ];
          onUpdateProfile({
            ...currentUser,
            avatarUrl: dataUrl,
            activities: updatedActivities
          });
        }
      }
    }
  };

  // Handle manual file load
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        if (currentUser) {
          const updatedActivities = [
            { id: `act_${Date.now()}`, action: `Uploaded profile image file: ${file.name}`, timestamp: new Date().toISOString() },
            ...(currentUser.activities || [])
          ];
          onUpdateProfile({
            ...currentUser,
            avatarUrl: result,
            activities: updatedActivities
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving details
  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setPasswordErrorMsg('');
    const isPasswordChanged = profilePassword !== (currentUser.password || '');
    
    if (isPasswordChanged && profilePassword !== confirmProfilePassword) {
      setPasswordErrorMsg('Passwords do not match. Please confirm your new password.');
      return;
    }

    const oldName = currentUser.fullName;
    const isNewName = oldName !== fullName;
    const updatedActivities = [...(currentUser.activities || [])];
    
    if (isNewName) {
      updatedActivities.unshift({
        id: `act_${Date.now()}`,
        action: `Modified display name from "${oldName}" to "${fullName}"`,
        timestamp: new Date().toISOString()
      });
    }
    
    if (isPasswordChanged) {
      updatedActivities.unshift({
        id: `act_${Date.now()}_pwd`,
        action: `Successfully changed profile password`,
        timestamp: new Date().toISOString()
      });
    }

    const updatedUser: User = {
      ...currentUser,
      fullName,
      avatarUrl,
      password: profilePassword,
      activities: updatedActivities
    };

    onUpdateProfile(updatedUser);
    setSavedSuccess(true);
    setConfirmProfilePassword('');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!currentUser) {
    return (
      <div className="p-8 text-center bg-zinc-950/90 border border-zinc-800 rounded-2xl max-w-md mx-auto my-12 text-white">
        <UserIcon className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
        <h4 className="text-lg font-bold">Access Denied</h4>
        <p className="text-xs text-zinc-400 mt-2">Please sign in to manage your user credentials and snap a live profile photo.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Avatar Camera & Profile Data */}
        <div className="md:col-span-5 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold tracking-tight uppercase border-b border-zinc-800 pb-3">
              👤 Profile Identity
            </h3>
            
            {/* Live Camera Feed or Static Avatar Picture */}
            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-2 border-white shadow-lg bg-zinc-900 group">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover scale-x-[-1]"
                  playsInline
                  muted
                />
              ) : avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={currentUser.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800">
                  <UserIcon className="w-12 h-12 text-zinc-500" />
                  <span className="text-[10px] text-zinc-400 font-mono">No Photo</span>
                </div>
              )}

              {/* Status Indicator */}
              {cameraActive && (
                <div className="absolute top-2 right-2 bg-rose-600 w-2.5 h-2.5 rounded-full animate-ping" title="Live Camera Feed Active" />
              )}
            </div>

            <p className="text-[10px] font-mono text-zinc-400">
              Role: <span className="text-pink-400 font-bold uppercase">{currentUser.role}</span>
            </p>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-zinc-300">{currentUser.email}</p>
              <div className="flex items-center justify-center gap-1.5">
                {currentUser.emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Account
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Pending Verification
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Tools for Photo Snapping & File Upload */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold uppercase text-zinc-400 tracking-wider">
              Photo Controls
            </span>

            {cameraActive ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" /> Snap Photo
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-3 py-2 bg-zinc-800 text-zinc-300 font-bold text-xs rounded-lg hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startCamera}
                className="w-full py-2 bg-zinc-900 border border-zinc-700 hover:border-white text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-pink-500" /> Use Live Camera
              </button>
            )}

            {cameraError && (
              <p className="text-[10px] text-rose-500 text-center font-medium leading-normal bg-rose-950/20 p-2 rounded border border-rose-900/40">{cameraError}</p>
            )}

            {/* Hidden canvas for snapshot render */}
            <canvas ref={canvasRef} className="hidden" />

            {/* File Upload Selector */}
            <div className="pt-2">
              <label className="w-full py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-zinc-850 text-zinc-300 transition-all">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>Upload JPG/PNG File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {avatarUrl && (
              <button
                type="button"
                onClick={() => {
                  setAvatarUrl('');
                  if (currentUser) {
                    onUpdateProfile({ ...currentUser, avatarUrl: '' });
                  }
                }}
                className="w-full py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded text-[10px] font-mono border border-transparent hover:border-zinc-800 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Trash className="w-3 h-3 text-rose-500" /> Reset Profile Photo
              </button>
            )}
          </div>

          {/* Edit Information Form */}
          <form onSubmit={handleSaveName} className="space-y-4 pt-4 border-t border-zinc-800">
            <div>
              <label className="block text-[11px] font-bold uppercase text-zinc-400 tracking-wider mb-1.5">
                Display Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-white text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none transition-all font-medium"
                placeholder="Mohammed Isa"
              />
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <span className="block text-[11px] font-bold uppercase text-zinc-400 tracking-wider mb-2">
                🔒 Security & Auth Credentials
              </span>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1">
                    New Secure Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={profilePassword}
                      onChange={(e) => setProfilePassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-white text-white text-xs rounded-lg pl-3 pr-10 py-2.5 focus:outline-none transition-all font-medium font-mono"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-all cursor-pointer"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {profilePassword !== (currentUser.password || '') && (
                  <div className="animate-in fade-in duration-200">
                    <label className="block text-[10px] text-zinc-400 mb-1">
                      Confirm New Password <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={confirmProfilePassword}
                      onChange={(e) => setConfirmProfilePassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-white text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none transition-all font-medium font-mono"
                      placeholder="Re-type new password"
                    />
                  </div>
                )}
                
                {passwordErrorMsg && (
                  <p className="text-[10px] text-rose-500 font-semibold">{passwordErrorMsg}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-bold text-xs rounded-lg hover:opacity-95 transition-all shadow-md cursor-pointer uppercase tracking-wider"
            >
              Update Display Credentials
            </button>

            {savedSuccess && (
              <div className="p-2 bg-emerald-950/40 text-emerald-400 rounded border border-emerald-800/50 text-center text-[11px] font-bold">
                ✓ Identity Credentials Saved Successfully!
              </div>
            )}
          </form>
        </div>

        {/* Right Column: User Portal Activity History Logs */}
        <div className="md:col-span-7 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold tracking-tight uppercase flex items-center gap-2">
                <History className="w-5 h-5 text-pink-500" /> Interactive Activity History
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                {currentUser.activities?.length || 0} Events
              </span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {!currentUser.activities || currentUser.activities.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 space-y-2">
                  <History className="w-10 h-10 mx-auto opacity-30 animate-pulse" />
                  <p className="text-xs">No logged actions found for your current session.</p>
                  <p className="text-[10px] text-zinc-600">Register for a course, order laptops, switch language options, or update your profile to build your interactive timeline history.</p>
                </div>
              ) : (
                <div className="relative border-l border-zinc-800 pl-4 ml-2 space-y-4 pt-1">
                  {currentUser.activities.map((act) => (
                    <div key={act.id} className="relative group text-xs text-zinc-300">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-zinc-950 ring-2 ring-zinc-800 transition-all group-hover:bg-pink-500 group-hover:ring-pink-300" />
                      
                      <div className="bg-zinc-900/55 p-3 rounded-xl border border-zinc-800/70 hover:border-zinc-700/80 transition-all space-y-1">
                        <p className="font-medium text-zinc-200">{act.action}</p>
                        <p className="text-[10px] font-mono text-zinc-500">
                          {new Date(act.timestamp).toLocaleString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 mt-6 flex justify-between items-center text-[10px] font-mono text-zinc-500">
            <span>Secure Enterprise Session ID: #{currentUser.id}</span>
            <span>VISTA System Core</span>
          </div>
        </div>

      </div>
    </div>
  );
}
