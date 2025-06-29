import { useState, useEffect, useRef } from 'react';

interface AlarmSound {
  id: string;
  name: string;
  type: 'FIRE' | 'MEDICAL' | 'SECURITY' | 'EVACUATION' | 'GENERAL';
  frequency: number; // Hz
  pattern: 'CONTINUOUS' | 'INTERMITTENT' | 'PULSE' | 'WARBLE';
}

const alarmSounds: AlarmSound[] = [
  { id: 'fire', name: 'Fire Alarm', type: 'FIRE', frequency: 3000, pattern: 'INTERMITTENT' },
  { id: 'medical', name: 'Medical Emergency', type: 'MEDICAL', frequency: 800, pattern: 'PULSE' },
  { id: 'security', name: 'Security Alert', type: 'SECURITY', frequency: 1500, pattern: 'WARBLE' },
  { id: 'evacuation', name: 'Evacuation Signal', type: 'EVACUATION', frequency: 2000, pattern: 'CONTINUOUS' },
  { id: 'general', name: 'General Alert', type: 'GENERAL', frequency: 1000, pattern: 'INTERMITTENT' }
];

export const useAlarmSystem = () => {
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [currentAlarm, setCurrentAlarm] = useState<AlarmSound | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      stopAlarm();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createTone = (frequency: number, duration: number = 1000) => {
    if (!audioContextRef.current || isMuted) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration / 1000);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration / 1000);

    return { oscillator, gainNode };
  };

  const playAlarmPattern = (alarm: AlarmSound) => {
    if (!audioContextRef.current || isMuted) return;

    const playTone = () => {
      switch (alarm.pattern) {
        case 'CONTINUOUS':
          createTone(alarm.frequency, 2000);
          break;
        case 'INTERMITTENT':
          createTone(alarm.frequency, 500);
          setTimeout(() => createTone(alarm.frequency, 500), 700);
          break;
        case 'PULSE':
          for (let i = 0; i < 3; i++) {
            setTimeout(() => createTone(alarm.frequency, 200), i * 300);
          }
          break;
        case 'WARBLE':
          createTone(alarm.frequency, 300);
          setTimeout(() => createTone(alarm.frequency * 1.2, 300), 350);
          setTimeout(() => createTone(alarm.frequency, 300), 700);
          break;
      }
    };

    playTone();
    intervalRef.current = setInterval(playTone, 2500);
  };

  const startAlarm = (alarmType: AlarmSound['type']) => {
    const alarm = alarmSounds.find(a => a.type === alarmType) || alarmSounds[0];
    setCurrentAlarm(alarm);
    setIsAlarmActive(true);
    
    // Resume audio context if suspended
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    playAlarmPattern(alarm);
  };

  const stopAlarm = () => {
    setIsAlarmActive(false);
    setCurrentAlarm(null);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
      oscillatorRef.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stopAlarm();
    } else if (isAlarmActive && currentAlarm) {
      playAlarmPattern(currentAlarm);
    }
  };

  const setAlarmVolume = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  return {
    isAlarmActive,
    currentAlarm,
    volume,
    isMuted,
    startAlarm,
    stopAlarm,
    toggleMute,
    setAlarmVolume,
    alarmSounds
  };
};