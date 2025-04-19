import { useState, useEffect } from 'react';
import { getWeather } from '../../services/geminiService';

const LiveInstructions = ({ destination }: { destination: string }) => {
  const [instructions, setInstructions] = useState<string[]>(['Loading...']);

  useEffect(() => {
    const updateInstructions = async () => {
      const data = await getWeather(destination);
      const tips = [
        `Check weather: ${data.weather}.`,
        'Bring an umbrella if rain is expected.'
      ];
      setInstructions(tips);
    };
    updateInstructions();
    const interval = setInterval(updateInstructions, 1800000); // Update every 30 minutes
    return () => clearInterval(interval);
  }, [destination]);

  return (
    <div>
      {instructions.map((inst, index) => <p key={index}>{inst}</p>)}
    </div>
  );
};

export default LiveInstructions;