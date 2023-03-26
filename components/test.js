import React from "react";

export default function Test({ submitTest, sector, index }) {
  const [entry, setEntry] = React.useState("");

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTest(sector, index, entry);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} />
        <button type="submit">enter</button>
      </form>
    </>
  );
}
