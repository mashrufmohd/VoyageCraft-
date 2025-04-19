import { useState, useEffect } from 'react';
import { getBudget } from '../../services/geminiService';

const BudgetTracker = ({ destination }: { destination: string }) => {
  const [budget, setBudget] = useState<string>('Loading...');

  useEffect(() => {
    const updateBudget = async () => {
      const data = await getBudget(destination);
      setBudget(data.estimate || 'N/A');
    };
    updateBudget();
    const interval = setInterval(updateBudget, 3600000); // Update hourly
    return () => clearInterval(interval);
  }, [destination]);

  return <div>Estimated Budget: {budget}</div>;
};

export default BudgetTracker;