import { useState } from "react";

function App() {
  const [text, settext] = useState("");
  const [data, setdata] = useState(null); // Change to null to handle absence of data
  const [error, setError] = useState(""); // State to store error message

  async function handledata() {
    const link = `http://api.weatherapi.com/v1/current.json?key=52ae9122356643ffab091745240111&q=${text}`;
    try {
      const res = await fetch(link);
      if (!res.ok) {
        setError("Please enter a proper city"); // Set error message
        setdata(null); // Clear data on error
        return;
      }
      const temp = await res.json();
      setdata(temp);
      setError(""); // Clear error if data is fetched successfully
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again."); // Handle fetch error
      setdata(null);
    }
  }

  function handlefiled(e) {
    settext(e.target.value);
    setdata(null); // Clear data on input change
    setError(""); // Clear error when typing a new city
  }

  console.log(data);

  return (
    <>
      <h1>Weather Forecast App</h1>
      <input type="text" onChange={handlefiled} />
      <button onClick={handledata}>Search</button>
      <div>
        {error ? ( // Display error message if exists
          <p>{error}</p>
        ) : data ? ( // Display weather data if available
          <div>
            <h3>Welcome! {data.location?.name}</h3>
            <p>
              Temp: {data.current?.temp_c}°C - {data.current?.temp_f}°F - {data.current?.condition?.text}
            </p>
            <p>
              City: {data.location?.name} - State: {data.location?.region}
            </p>
            <p>Date & Time: {data.location?.localtime}</p>
            <p>Last updated on: {data.current?.last_updated}</p>
          </div>
        ) : (
          <p>Enter the city</p> // Default message
        )}
      </div>
    </>
  );
}

export default App;
