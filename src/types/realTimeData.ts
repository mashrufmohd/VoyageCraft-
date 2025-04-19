export interface WeatherData {
    weather: string;
    temperature: number;
    humidity?: number;
  }
  
  export interface BudgetData {
    estimate: string;
    currency: string;
  }
  
  export interface AlertData {
    alerts: string[];
  }
  
  export interface RealTimeData {
    weather?: WeatherData;
    budget?: BudgetData;
    alerts?: AlertData;
  }