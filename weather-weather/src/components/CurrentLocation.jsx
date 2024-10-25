import React, { useEffect, useState } from 'react';
import CookieConsent from  'react-cookie-consent';


export default function CurrentLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fahrenheit, setFahrenheit] = useState(null);
    const [temperatureUnit, setTemperatureUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [upcomingEvent, setUpcomingEvent] = useState(''); // State for unique upcoming event/message

    useEffect(() => {
        async function fetchCurrentLocation() {
            if (navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const appid = "6a4306a0f2c73c28dc5c3bbf739e87d0";

                    try {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`);
                        const data = await response.json();

                        // Check if the location was found
                        if (data.cod === 200) {
                            setLocation(data);
                            setIsLoading(false);

                            // Save weather data to localStorage
                            saveToLocalStorage(data);

                            // Calculate and set temperature in Fahrenheit
                            calculate(data);

                            // Update the unique upcoming event based on weather
                            determineUpcomingEvent(data);
                        } else {
                            setError('Location not found. Please ensure your location services are enabled.');
                            setIsLoading(false);
                        }
                    } catch (error) {
                        setError('Error fetching the location data. Please check your connection.');
                        setIsLoading(false);
                        console.error('Error fetching the location data:', error);
                    }
                }, (error) => {
                    handleGeolocationError(error);
                    loadFromLocalStorage(); // Fallback to cached data if available
                });
            } else {
                setError('Geolocation is not supported by this browser.');
                loadFromLocalStorage();
            }
        }

        fetchCurrentLocation();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsModalOpen((prev) => !prev); // Toggle modal visibility
            if (location) {
                determineUpcomingEvent(location); // Update event message based on current weather
            }
        }, 4000); // Change this value to set how long the modal stays open/closed

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [location]);

    function handleGeolocationError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("Location access denied. Please allow location permissions in your browser.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("Request to get location timed out.");
                break;
            default:
                setError("An unknown error occurred.");
                break;
        }
    }

    function calculate(location) {
        const tempCelsius = location.main.temp;
        const tempFahrenheit = (tempCelsius * 1.8) + 32;
        setFahrenheit(tempFahrenheit); // Store Fahrenheit temperature
    }

    function saveToLocalStorage(data) {
        const weatherData = {
            location: data,
            timestamp: Date.now(),
        };
        localStorage.setItem('currentWeather', JSON.stringify(weatherData));
    }

    function loadFromLocalStorage() {
        const cachedData = localStorage.getItem('currentWeather');
        if (cachedData) {
            const { location, timestamp } = JSON.parse(cachedData);

            // Use the cached data if it's less than 6 hours old
            if (Date.now() - timestamp < 6 * 60 * 60 * 1000) {
                setLocation(location);
                calculate(location);
            } else {
                setError('Cached data is too old. Please connect to the internet to get the latest weather information.');
            }
        } else {
            setError('No cached data available. Please connect to the internet.');
        }
        setIsLoading(false);
    }

    function toggleTemperatureUnit() {
        setTemperatureUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
    }

    // Function to determine unique upcoming event or message based on the weather
    function determineUpcomingEvent(data) {
        const messages = [];

        if (data.weather[0].main === "Rain") {
            messages.push("Rain is coming. Grab an umbrella!");
            messages.push("It's wet outside! Don't forget your raincoat.");
            messages.push("Stay dry, it's going to rain.");
        } else if (data.main.temp > 30) {
            messages.push("Hot day ahead! Stay hydrated.");
            messages.push("It's scorching out! Avoid too much sun.");
            messages.push("Keep cool! It's over 30°C.");
        } else if (data.main.temp < 10) {
            messages.push("It's cold out there! Wear something warm.");
            messages.push("Brrr! Stay warm, it's chilly outside.");
        } else {
            messages.push("The weather looks perfect today!");
            messages.push("It's a great day to be outdoors.");
            messages.push("Enjoy the nice weather!");
            messages.push("Enjoy the nice weather!");
        }

        // Randomly pick a message from the list of possible messages
        const randomIndex = Math.floor(Math.random() * messages.length);
        setUpcomingEvent(messages[randomIndex]);
    }

    // Determine the temperature to display based on the selected unit
    const displayTemperature = temperatureUnit === 'C' 
        ? location?.main.temp
        : fahrenheit;

    return (
        <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : (
                location && (
                    <>
                        <h1 className='current'>Your Current Location: {location.name}</h1>
                        <ul className="Current">
                            <h3>Today's Weather</h3>
                            <img src={`https://openweathermap.org/img/wn/${location.weather[0].icon}.png`} alt={location.weather[0].description} />
                            <li>Location: {location.name}</li>
                            <li>Temperature: {displayTemperature}°{temperatureUnit}</li>
                            <li>Weather: {location.weather[0].description}</li>
                            <li>Humidity: {location.main.humidity}%</li>
                            <li>Wind Speed: {location.wind.speed} m/s</li>
                            <button 
                                className='change'
                                onClick={toggleTemperatureUnit}>
                                Switch to {temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
                            </button>
                        </ul>

                        {/* Modal Implementation */}
                        {isModalOpen && (
                            <div className="modal">
                                <h2>Upcoming Event</h2>
                                <p>{upcomingEvent}</p> 
                            </div>
                        )}
                    </>
                )
            )}

            {/* Cookie Consent Implementation */}
            <CookieConsent
                location="bottom"
                buttonText="Got it!"
                cookieName="myAwesomeCookieName"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px", fontWeight: "bold" }}
                expires={150}
            >
                This website uses cookies to enhance the user experience. 
            </CookieConsent>
        </div>
    );
}
