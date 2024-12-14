import "./styles.css";
import { useState } from "react";

export default function App() {
  const [suma, setSuma] = useState("");
  const [przelicznik, setPrzelicznik] = useState(4.3); // Domyślny przelicznik
  const [walutaNazwa, setWalutaNazwa] = useState("EUR"); // Domyślna nazwa waluty
  // Obliczanie wartości w innej walucie
  const waluta = suma / przelicznik;

  return (
    <div className="App">
      <h1>Kalkulator walut</h1>
      <Input
        suma={suma}
        onSetSuma={setSuma}
        onSetPrzelicznik={setPrzelicznik}
        onSetWalutaNazwa={setWalutaNazwa}
      />
      <Output suma={suma} waluta={waluta} walutaNazwa={walutaNazwa} />
      <Reset
        onReset={() => {
          setSuma("");
        }}
      />
    </div>
  );
}

function Input({ suma, onSetSuma, onSetPrzelicznik, onSetWalutaNazwa }) {
  return (
    <div>
      <label>Wpisz sumę do przeliczenia w PLN </label>
      <input
        type="text"
        placeholder="Suma"
        value={suma}
        onChange={(e) => onSetSuma(Number(e.target.value))}
      />
      <SelectCur
        onSelect={(przelicznik, nazwaWaluty) => {
          onSetPrzelicznik(przelicznik);
          onSetWalutaNazwa(nazwaWaluty);
        }}
      />
    </div>
  );
}

function SelectCur({ przelicznik, onSelect }) {
  return (
    <div>
      <select
        value={przelicznik} // Ustawiamy wartość select jako przelicznik
        onChange={(e) => {
          const selectedOption = e.target.options[e.target.selectedIndex];
          const przelicznik = Number(selectedOption.value);
          const nazwaWaluty = selectedOption.text.split(" ")[0]; // Pobiera nazwę waluty z tekstu opcji
          onSelect(przelicznik, nazwaWaluty);
        }}
      >
        <option value="4.30"> EUR (Euro)</option>
        <option value="4.10"> USD (Dolar amerykański)</option>
        <option value="5.30"> GBP (Funt brytyjski)</option>
      </select>
    </div>
  );
}

function Output({ suma, waluta, walutaNazwa }) {
  return (
    <h3>
      {suma} PLN to {waluta.toFixed(2)} {walutaNazwa}
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Resetuj</button>;
}
