import "normalize.css";
import "./App.css";

import { Provider } from "react-redux";

import Header from "./components/Header";
import Filters from "./components/Filters";
import { store } from "./store/store";
import SearchInput from "./components/SearchInput";
import CharactersTable from "./components/CharactersTable";
import SelectedCharacters from "./components/SelectedCharacters";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <SelectedCharacters />
      {/*<SearchInput />
      <Filters /> */}
      <CharactersTable />
    </Provider>
  );
}

export default App;
