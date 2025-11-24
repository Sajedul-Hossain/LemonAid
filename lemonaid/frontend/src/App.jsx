import React from 'react'
import './App.css'
import Home from './pages/Home'

function App() {
<<<<<<< HEAD
  // Render the Home page component as the app root
  return <Home />
=======
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState("");
  fetch ("/api/test-get")
  .then(response => response.json())
  .then(json => console.log(json));

  fetch("/api/url-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({url: url})
  })
  .then(response => response.json())
  .then(json => console.log(json));

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste product URL"
        />

        <p>
          {" "}
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
>>>>>>> fork/home
}

export default App
