import { useState, useEffect } from 'react';
import { getWeather } from '../../services/geminiService'; // Adjusted path

const VoiceGuide = ({ destination }: { destination: string }) => {
  const [instruction, setInstruction] = useState<string>('Loading...');
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  useEffect(() => {
    const updateInstruction = async () => {
      const data = await getWeather(destination);
      const msg = `Current weather in ${destination} is ${data.weather}.`;
      setInstruction(msg);
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(msg);
        synth.speak(utterance);
      }
    };
    updateInstruction();
    const interval = setInterval(updateInstruction, 1800000); // Update every 30 minutes
    return () => clearInterval(interval);
  }, [destination]);

  return <div>Voice Guide: {instruction}</div>;
};

export default VoiceGuide;