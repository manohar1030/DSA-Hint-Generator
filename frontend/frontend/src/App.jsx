import { useState } from "react";

function App() {
  const [problem, setProblem] = useState("");
  const [hints, setHints] = useState(null);

  const getHints = async () => {
    const res = await fetch("http://127.0.0.1:8000/generate-hints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: problem }),
    });

    const data = await res.json();
    setHints(data);
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

      {hints && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Hint 1:</b> {hints.hint1}</p>
          <p><b>Hint 2:</b> {hints.hint2}</p>
          <p><b>Hint 3:</b> {hints.hint3}</p>
        </div>
      )}
    </div>
  );
}

export default App;