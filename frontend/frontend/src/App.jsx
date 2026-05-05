import { useState } from "react";

function App() {
  const [problem, setProblem] = useState("");
  const [hints, setHints] = useState(null);

  const getHints = async () => {
    try {
      console.log("BUTTON CLICKED");
      const res = await fetch("http://127.0.0.1:8000/generate-hints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: problem }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error", res.status, errorText);
        setHints({ error: `Backend error ${res.status}: ${errorText}` });
        return;
      }

      const data = await res.json();
      setHints(data);
    } catch (error) {
      console.error("Request failed", error);
      setHints({ error: error?.message || String(error) });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>DSA Hint Generator</h2>

      <textarea
        rows="5"
        cols="50"
        placeholder="Enter problem..."
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />

      <br /><br />

      <button onClick={getHints}>Generate Hints</button>

      {hints?.error ? (
        <div style={{ marginTop: "20px", color: "red" }}>
          <p><b>Error:</b> {hints.error}</p>
        </div>
      ) : hints ? (
        <div style={{ marginTop: "20px" }}>
          <p><b>Hint 1:</b> {hints.hint1}</p>
          <p><b>Hint 2:</b> {hints.hint2}</p>
          <p><b>Hint 3:</b> {hints.hint3}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;