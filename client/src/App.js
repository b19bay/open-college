import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "", date: "", type: "", college: "", location: "", link: ""
  });

  useEffect(() => {
    axios.get("/api/events").then(res => setEvents(res.data));
  }, []);

  const submit = async () => {
    await axios.post("/api/events", form);
    const updated = await axios.get("/api/events");
    setEvents(updated.data);
    setForm({ name: "", date: "", type: "", college: "", location: "", link: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Submit Event</h2>
      {["name", "date", "type", "college", "location", "link"].map((f) => (
        <input key={f} placeholder={f} value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button onClick={submit}>Submit</button>

      <h2>Events</h2>
      {events.map((e, i) => (
        <div key={i}>
          <h3>{e.name}</h3>
          <p>{e.type} - {e.college}</p>
          <p>{e.date} @ {e.location}</p>
          <a href={e.link} target="_blank" rel="noreferrer">Link</a>
        </div>
      ))}
    </div>
  );
}

export default App;
