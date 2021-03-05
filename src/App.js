import { useState } from "react";
import React, { useEffect } from "react";


function App() {
  const [data, setData] = useState([]);
  const [selectvalue, setselectvalue] = useState("marcos");
  useEffect(() => {
    async function getData() {
      const data = await fetch("https://swapi.dev/api/people/")
        .then((res) => res.json())
        .then((res) => res);
      setData(data.results);
    }
    getData();
  }, []);

  function deletePerson(id) {
    const novospersonagens = data.filter((item) => item.name !== id);
    setData(novospersonagens);
    if (novospersonagens && novospersonagens.length) {
      setselectvalue(novospersonagens[0].name);
    }
  }
  console.log(selectvalue);
  return (
    <ul>
      <h1>Personagens</h1>
      <select onChange={(e) => setselectvalue(e.target.value)}>
        {data && data.length
          ? data.map((item) => {
              return <option>{item.name}</option>;
            })
          : null}
      </select>
      <button onClick={() => deletePerson(selectvalue)}>Excluir</button>
      {data && data.length
        ? data.map((item) => {
            return (
              <p>
                {item.name}
                <button onClick={() => deletePerson(item.name)}>Excluir</button>
              </p>
            );
          })
        : null}
    </ul>
  );
}

export default App;
