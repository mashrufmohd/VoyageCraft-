
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherForecast as WeatherForecastType } from '@/types';
import { format } from 'date-fns';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSun, 
  Moon, 
  Droplets, 
  Wind 
} from 'lucide-react';

interface WeatherForecastProps {
  forecast: WeatherForecastType[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-amber-500" />;
      case 'partly cloudy':
        return <CloudSun className="h-8 w-8 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'thunderstorm':
        return <CloudLightning className="h-8 w-8 text-purple-500" />;
      case 'clear':
        return <Moon className="h-8 w-8 text-indigo-400" />;
      default:
        return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };
  
  // Format date for display
  const formatForecastDate = (date: Date) => {
    return format(date, 'EEE, MMM d');
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {forecast.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            No weather data available
          </div>
        ) : (
          <div className="space-y-4">
            {forecast.map((day, index) => (
              <div 
                key={index} 
                className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getWeatherIcon(day.condition)}
                </div>
                
                <div className="ml-4 flex-grow">
                  <p className="font-medium">{formatForecastDate(day.date)}</p>
                  <p className="text-sm text-gray-500">{day.condition}</p>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-lg font-semibold">
                    {day.temperature.max}°
                    <span className="text-sm font-normal text-gray-500">
                      /{day.temperature.min}°
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Droplets className="h-3 w-3 mr-1" />
                    <span>{day.precipitation}%</span>
                    <Wind className="h-3 w-3 ml-2 mr-1" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
