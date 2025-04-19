import { useState, useEffect } from 'react';
import { getAlerts } from '../../services/geminiService';

const TravelAlerts = () => {
  const [alerts, setAlerts] = useState<string[]>(['Loading...']);

  useEffect(() => {
    const updateAlerts = async () => {
      const data = await getAlerts();
      setAlerts(data.alerts || ['No alerts']);
    };
    updateAlerts();
    const interval = setInterval(updateAlerts, 900000); // Update every 15 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {alerts.map((alert, index) => <p key={index}>{alert}</p>)}
    </div>
  );
};

export default TravelAlerts;