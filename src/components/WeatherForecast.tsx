import { FormEvent, useState, useEffect } from "react";

const URL = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";

interface Forecast {
  update_timestamp: Date;
  timestamp: Date;
  valid_period: {
    start: Date;
    end: Date;
  };
  forecasts: { area: string; forecast: string }[];
}

const initialForecast: Forecast = {
  update_timestamp: new Date(),
  timestamp: new Date(),
  valid_period: {
    start: new Date(),
    end: new Date(),
  },
  forecasts: [],
};

const WeatherForecast = () => {
  const [data, setData] = useState<Forecast>(initialForecast);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [submittedArea, setSubmittedArea] = useState<string>("");
  const [selectedForecast, setSelectedForecast] = useState<string>("");

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      result.json().then((json) => {
        console.log(json.items[0]);
        setData(json.items[0]);
      });
    };
    fetchData();
  }, []);

  // Helper function for form handling
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const forecast = data.forecasts.find(
      (forecast) => forecast.area === selectedArea
    );
    if (forecast) {
      setSubmittedArea(selectedArea);
      setSelectedForecast(forecast.forecast);
    }
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  // Helper function to format time including date and time
  const formatDateTime = (date: Date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  // Helper function to format time for forecast period (time only)
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Helper function to select icon based on forecast
  const selectIcon = (forecast: string) => {
    switch (forecast) {
      case "Fair":
        return "bi bi-brightness-high";
      case "Fair (Day)":
        return "bi bi-brightness-low";
      case "Fair (Night)":
        return "bi bi-moon-stars";
      case "Partly Cloudy":
        return "bi bi-cloud";
      case "Partly Cloudy (Day)":
        return "bi bi-cloud-sun";
      case "Partly Cloudy (Night)":
        return "bi bi-cloud-moon";
      case "Cloudy":
        return "bi bi-cloudy";
      case "Hazy":
        return "bi bi-cloud-haze";
      case "Slightly Hazy":
        return "bi bi-cloud-haze";
      case "Windy":
        return "bi bi-wind";
      case "Mist":
        return "bi bi-cloud-fog";
      case "Fog":
        return "bi bi-cloud-fog2";
      case "Light rain":
        return "bi bi-cloud-drizzle";
      case "Moderate Rain":
        return "bi bi-cloud-rain";
      case "Heavy Rain":
        return "bi bi-cloud-rain-heavy";
      case "Passing Showers":
        return "bi bi-cloud-drizzle";
      case "Light Showers":
        return "bi bi-cloud-drizzle";
      case "Showers":
        return "bi bi-cloud-rain";
      case "Heavy Showers":
        return "bi bi-cloud-rain-heavy";
      case "Thundery Showers":
        return "bi bi-cloud-lightning";
      case "Heavy Thundery Showers":
        return "bi bi-cloud-lightning-rain";
      case "Heavy Thundery Showers with Gusty Winds":
        return "bi bi-cloud-lightning-rain";
      default:
        return "";
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <div className="row fixed-width-row g-0">
          <h2 className="mb-3">2-Hour Weather Forecast</h2>
          <div className="forecast-container mb-3">
            {selectedForecast && (
              <div className="forecast-display">
                <p>
                  Forecast for {submittedArea} from{" "}
                  {formatTime(new Date(data.valid_period.start))} to{" "}
                  {formatTime(new Date(data.valid_period.end))}
                </p>
                <i className={selectIcon(selectedForecast)}></i>
                <p className="forecast-text mb-4">{selectedForecast}</p>
                <p>
                  Updated at: {formatDateTime(new Date(data.update_timestamp))}
                </p>
              </div>
            )}
          </div>
          <label htmlFor="area-select" className="col-sm-2 col-form-label">
            Area
          </label>
          <div className="col mb-3">
            <select
              id="area-select"
              className="form-select"
              value={selectedArea}
              onChange={handleAreaChange}
              required
            >
              <option value="" disabled>
                Select an area...
              </option>
              {data.forecasts.map((forecast, index) => (
                <option value={forecast.area} key={index}>
                  {forecast.area}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Get Forecast
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeatherForecast;
