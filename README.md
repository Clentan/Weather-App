Weather App 🌦️
This Weather App provides real-time weather updates based on location, with features to switch between daily and hourly forecasts, and view detailed weather icons for each condition.

Features
Current Location Forecast: Retrieve weather data for the user’s current or saved location.
Daily & Hourly Weather Forecast: View maximum, minimum, and hourly temperatures, including weather conditions and icons.
Location Storage: Saves last searched location using cookies, so you can return to it easily.
Dynamic Icons: Displays unique icons for various weather conditions.
Responsive Navigation: Allows easy navigation to privacy and terms pages.
Animations: Smooth transitions between hourly weather updates.
Built With
React: Front-end framework for building the user interface.
React Router: Manages routing for the Privacy and Terms pages.
JavaScript (ES6+): For all main functionality.
CSS: For styling components and animations.
js-cookie: Manages saved location storage.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/weather-app.git
cd weather-app
Install dependencies:
bash
Copy code
npm install
Start the application:
bash
Copy code
npm start
Usage
Search Location: Enter the name of the location to get weather updates.
View Daily Weather: Displays daily max and min temperatures along with weather icons.
Hourly Weather Updates: Navigate through the hourly forecast with 'Next' and 'Previous' buttons.
Saved Location: Your last searched location will be stored in cookies and automatically loaded on your next visit.
Components
App: Main app component, manages state and fetching weather data.
Header: Contains navigation and location search input.
CurrentLocation: Displays the current location.
Weather: Displays daily weather conditions for the searched location.
Day: Renders each day’s weather icon, max and min temperatures.
HourlyWeather: Handles hourly forecast updates with animation for smooth transitions.
API Reference
Open Meteo API: Provides daily and hourly weather data.
Open Meteo API
Error Handling
Displays an error message if the location or weather data is unavailable.
License
This project is licensed under the MIT License. See LICENSE for more information.

Acknowledgments
Open Meteo API for providing free weather data.
Inspired by various weather app designs for the front-end structure and UI.
