'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useRoomContext,
  useParticipants,
} from '@livekit/components-react';
import { RoomEvent } from 'livekit-client';
import { useTheme } from 'next-themes';

// Goodbye phrases to detect for auto-disconnect (specific to avoid false positives)
const GOODBYE_PHRASES = [
  'goodbye', 'bye bye', 'bye for now', 'paalam na',
  'talk to you later', 'talk later', 'see you later', 'see you soon',
  'take care', 'have a good one', 'have a great day', 'nice talking',
  'ingat ka', 'babay', 'kita kits'
];

// Suggestion prompts for users
const SUGGESTION_PROMPTS = [
  "Ano ang mga projects mo?",
  "Tell me about yourself",
  "Show me your skills",
  "Paano kita makokontak?",
];

// Animated Orb Component - Glowing Sphere Style
function VoiceOrb({ isActive, isListening, isSpeaking, onClick, status }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const { theme } = useTheme(); // Get current theme
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const size = 40;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const baseRadius = 14;
    
    const animate = () => {
      timeRef.current += 0.01; // Ultra slow for subtle "breathing" feel
      const t = timeRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Calculate morphing - minimal values for "solid" feel
      let morph = 0;
      let sizePulse = 0;
      
      if (isSpeaking) {
        morph = 1.5; // Very slight wobbling when speaking
        sizePulse = Math.sin(t * 8) * 1; // Gentle pulse
      } else if (isListening) {
        morph = 1; // Barely moving when listening
        sizePulse = Math.sin(t * 4) * 0.5;
      } else if (isActive) {
        morph = 0.5; // Micro movement when idle
        sizePulse = Math.sin(t * 2) * 0.2;
      }

      const currentRadius = baseRadius + sizePulse;
      
      // Draw morphing blob (subtle)
      ctx.beginPath();
      const points = 60;
      
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        
        // Organic movement - extremely reduced amplitude
        let radiusOffset = 0;
        if (isActive) {
           radiusOffset += Math.sin(angle * 3 + t) * morph;
           radiusOffset += Math.cos(angle * 5 - t * 0.8) * (morph * 0.5);
        }
        
        const r = currentRadius + radiusOffset;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();

      // Fill with Rich Dark Gradient (3D Sphere Look)
      if (isActive) {
        // Radial gradient for 3D sphere look
        // Offset center to simulate light source from top-left
        const gradient = ctx.createRadialGradient(
          centerX - 4, centerY - 4, 1.5,
          centerX, centerY, baseRadius * 1.5
        );

        if (theme === 'dark') {
            // DARK MODE: White/Silver Orb
            if (isSpeaking) {
                // Speaking: Bright White with subtle blue tint
                gradient.addColorStop(0, '#ffffff'); 
                gradient.addColorStop(0.3, '#e4e4e7'); // Zinc-200
                gradient.addColorStop(1, '#a1a1aa'); // Zinc-400 Shadow
            } else if (isListening) {
                // Listening: White with subtle teal tint
                gradient.addColorStop(0, '#ffffff'); 
                gradient.addColorStop(0.3, '#f4f4f5'); // Zinc-100
                gradient.addColorStop(1, '#cbd5e1'); // Slate-300 Shadow
            } else {
                // Idle: Pure White/Silver
                gradient.addColorStop(0, '#ffffff'); 
                gradient.addColorStop(0.2, '#f4f4f5'); 
                gradient.addColorStop(1, '#d4d4d8'); // Zinc-300 Shadow
            }
        } else {
            // LIGHT MODE: Black/Obsidian Orb
            if (isSpeaking) {
                // Speaking: Obsidian with subtle violet tint
                gradient.addColorStop(0, '#52525b'); // Zinc-600 Highlight
                gradient.addColorStop(0.3, '#3f3f46'); // Zinc-700
                gradient.addColorStop(1, '#020617'); // Slate-950 Shadow
            } else if (isListening) {
                // Listening: Obsidian with subtle teal tint
                gradient.addColorStop(0, '#52525b'); 
                gradient.addColorStop(0.3, '#27272a');
                gradient.addColorStop(1, '#042f2e'); // Deep Teal-950 Shadow
            } else {
                // Idle: Pure Obsidian
                gradient.addColorStop(0, '#71717a'); // Zinc-500 Highlight
                gradient.addColorStop(0.2, '#27272a'); // Zinc-800 Body
                gradient.addColorStop(1, '#000000'); // Black Shadow
            }
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add subtle rim light for definition
        ctx.strokeStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Disconnected: Matte sphere
        const gradient = ctx.createRadialGradient(
          centerX - 3, centerY - 3, 1.5,
          centerX, centerY, baseRadius
        );
        if (theme === 'dark') {
             gradient.addColorStop(0, '#f4f4f5');
             gradient.addColorStop(1, '#a1a1aa');
        } else {
             gradient.addColorStop(0, '#3f3f46');
             gradient.addColorStop(1, '#09090b');
        }
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isListening, isSpeaking, theme]);
  
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      aria-label="Voice Assistant"
      title={status === 'disconnected' ? 'Talk to AI' : status}
    >
      <canvas 
        ref={canvasRef}
        className="cursor-pointer"
      />
    </button>
  );
}

// Live Transcript Display - positioned above navbar
function TranscriptBubble({ text, isVisible }) {
  if (!isVisible || !text) return null;
  
  return (
    <div className="fixed bottom-22 left-1/2 -translate-x-1/2 right-auto md:left-auto md:translate-x-0 md:right-8 z-50 w-[calc(100%-2rem)] max-w-[90vw] md:max-w-md md:w-full px-4 animate-fade-in pointer-events-none flex justify-center md:justify-end">
      <div className="bg-black/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-sm">🤖</span>
          </div>
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

// Suggestion Prompts - positioned above navbar
function SuggestionPrompts({ isVisible, onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % SUGGESTION_PROMPTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-22 left-1/2 -translate-x-1/2 right-auto md:left-auto md:translate-x-0 md:right-8 z-40 w-[calc(100%-2rem)] md:w-auto animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-zinc-500 justify-center md:justify-end">
        <span>Try:</span>
        <button 
          onClick={() => onSelect?.(SUGGESTION_PROMPTS[currentIndex])}
          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-all hover:scale-105"
        >
          "{SUGGESTION_PROMPTS[currentIndex]}"
        </button>
      </div>
    </div>
  );
}

// Active Room Content - handles the live session
function ActiveRoomContent({ onDisconnect, onListeningChange, onSpeakingChange, onTranscript, onAction }) {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [roomState, setRoomState] = useState('unknown');
  const goodbyeHandledRef = useRef(false);
  const hasSeenAgentRef = useRef(false);
  const lastTranscriptRef = useRef('');

  // Track room state
  useEffect(() => {
    if (!room) return;
    const updateState = () => setRoomState(room.state);
    room.on(RoomEvent.ConnectionStateChanged, updateState);
    updateState();
    return () => room.off(RoomEvent.ConnectionStateChanged, updateState);
  }, [room]);

  // Listen for transcription events from the agent
  useEffect(() => {
    if (!room) return;

    const handleTranscription = (segments, participant) => {
      const identity = participant?.identity?.toLowerCase() || '';
      const isAgent = identity.includes('agent') || identity.includes('harper') || identity.includes('maeng');
      
      if (!isAgent) return;

      // Agent is speaking
      onSpeakingChange?.(true);
      
      // Clear speaking state after a delay
      setTimeout(() => onSpeakingChange?.(false), 2000);

      for (const segment of segments) {
        const text = segment.text || '';
        const lowerText = text.toLowerCase();
        
        // Update transcript display
        if (text && text !== lastTranscriptRef.current) {
          lastTranscriptRef.current = text;
          onTranscript?.(text);
        }

        // Check for goodbye phrases
        if (!goodbyeHandledRef.current) {
          for (const phrase of GOODBYE_PHRASES) {
            if (lowerText.includes(phrase)) {
              goodbyeHandledRef.current = true;
              setTimeout(() => onDisconnect?.(), 3000);
              return;
            }
          }
        }

        // Check for action commands
        const actionMatch = lowerText.match(/\[action:(\w+):([^\]]+)\]/i);
        if (actionMatch) {
          const [, actionType, actionParam] = actionMatch;
          onAction?.(actionType, actionParam);
        }
      }
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);
    return () => room.off(RoomEvent.TranscriptionReceived, handleTranscription);
  }, [room, onDisconnect, onAction, onTranscript, onSpeakingChange]);

  // Auto-enable microphone
  useEffect(() => {
    const enableMic = async () => {
      if (localParticipant && !isMicEnabled && roomState === 'connected') {
        try {
          await localParticipant.setMicrophoneEnabled(true);
          setIsMicEnabled(true);
          onListeningChange?.(true);
        } catch (error) {
          console.error('Mic error:', error);
        }
      }
    };
    const timer = setTimeout(enableMic, 1000);
    return () => clearTimeout(timer);
  }, [localParticipant, isMicEnabled, roomState, onListeningChange]);

  // Notify parent of mic state
  useEffect(() => {
    onListeningChange?.(isMicEnabled);
  }, [isMicEnabled, onListeningChange]);

  // Detect agent leave
  useEffect(() => {
    const hasAgent = participants.some(p => {
      const identity = p.identity?.toLowerCase() || '';
      return identity.includes('agent') || identity.includes('harper') || identity.includes('maeng');
      
    });
    
    if (hasAgent) hasSeenAgentRef.current = true;
    
    if (roomState === 'connected' && hasSeenAgentRef.current && !hasAgent && !goodbyeHandledRef.current) {
      goodbyeHandledRef.current = true;
      setTimeout(() => onDisconnect?.(), 1000);
    }
  }, [participants, roomState, onDisconnect]);

  return <RoomAudioRenderer />;
}

// Main VoiceChat Component
export default function VoiceChat({ onAction }) {
  const [connectionState, setConnectionState] = useState('disconnected');
  const [token, setToken] = useState('');
  const [wsUrl, setWsUrl] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showEndedMessage, setShowEndedMessage] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptTimeoutRef = useRef(null);

  // Handle transcript updates
  const handleTranscript = useCallback((text) => {
    setTranscript(text);
    setShowTranscript(true);
    
    if (transcriptTimeoutRef.current) {
      clearTimeout(transcriptTimeoutRef.current);
    }
    
    transcriptTimeoutRef.current = setTimeout(() => {
      setShowTranscript(false);
    }, 5000);
  }, []);

  const connect = useCallback(async () => {
    if (connectionState === 'connecting') return;
    
    setShowEndedMessage(false);
    setConnectionState('connecting');
    
    try {
      const response = await fetch('/api/token');
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setToken(data.token);
      setWsUrl(data.wsUrl);
      setConnectionState('connected');
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionState('error');
      setTimeout(() => setConnectionState('disconnected'), 3000);
    }
  }, [connectionState]);

  const disconnect = useCallback(() => {
    setToken('');
    setWsUrl('');
    setConnectionState('disconnected');
    setIsListening(false);
    setIsSpeaking(false);
    setShowTranscript(false);
    setTranscript('');
    setShowEndedMessage(true);
    setTimeout(() => setShowEndedMessage(false), 3000);
  }, []);

  const handleOrbClick = useCallback(() => {
    if (connectionState === 'disconnected' || connectionState === 'error') {
      connect();
    } else if (connectionState === 'connected') {
      disconnect();
    }
  }, [connectionState, connect, disconnect]);

  const handleAction = useCallback((actionType, actionParam) => {
    console.log('Handling action:', actionType, actionParam);
    onAction?.(actionType, actionParam);
  }, [onAction]);

  return (
    <>
      {/* Voice Orb - placed in navbar */}
      <div className="relative">
        <VoiceOrb 
          isActive={connectionState === 'connected' || connectionState === 'connecting'}
          isListening={isListening}
          isSpeaking={isSpeaking}
          onClick={handleOrbClick}
          status={connectionState}
        />
        
        {/* Status tooltips */}
        {showEndedMessage && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-full whitespace-nowrap animate-fade-in z-50">
            Call ended • Click to restart
          </div>
        )}
        
        {connectionState === 'connecting' && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-full whitespace-nowrap z-50">
            Connecting...
          </div>
        )}
      </div>

      {/* Live Transcript - above navbar */}
      <TranscriptBubble text={transcript} isVisible={showTranscript} />
      
      {/* Suggestion Prompts - above navbar */}
      <SuggestionPrompts 
        isVisible={connectionState === 'connected' && !showTranscript && !isSpeaking} 
        onSelect={() => {}} 
      />

      {/* LiveKit Room */}
      {connectionState === 'connected' && token && wsUrl && (
        <LiveKitRoom
          token={token}
          serverUrl={wsUrl}
          connect={true}
          audio={true}
          video={false}
          onDisconnected={disconnect}
          onError={(error) => {
            console.error('Room error:', error);
            setConnectionState('error');
          }}
          style={{ display: 'none' }}
        >
          <ActiveRoomContent 
            onDisconnect={disconnect}
            onListeningChange={setIsListening}
            onSpeakingChange={setIsSpeaking}
            onTranscript={handleTranscript}
            onAction={handleAction}
          />
        </LiveKitRoom>
      )}
    </>
  );
}
