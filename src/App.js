import { PageForecast } from "./components/PageForecast";

import { ForecastProvider } from "./context/forecast/ForecastProvider";

function App() {
  return (
    <ForecastProvider>
      <PageForecast />
    </ForecastProvider>
  );
}

export default App;
