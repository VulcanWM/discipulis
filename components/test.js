import React from "react";

export default function Test({ answer }) {
  const [entry, setEntry] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <div>
          <span
            style={{
              color: entry === answer ? "#0ced6a" : "#ff0000",
            }}
          >
            {answer}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} />
          <button type="submit">enter</button>
        </form>
      )}
    </>
  );
}
