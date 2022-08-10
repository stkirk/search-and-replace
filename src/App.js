import "./App.css";
import SearchAndReplaceForm from "./components/SearchAndReplaceForm";

function App() {
  return (
    <div className="App">
      <h1>Search and Replace</h1>
      <h4>
        Looking to replace a word or string of characters in a text document?
      </h4>
      <SearchAndReplaceForm />
    </div>
  );
}

export default App;
