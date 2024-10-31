import './App.css';
import CakeList from './components/Cake/CakeList.js';
import Jumbotron from './components/Jumbotron/Jumbotron.js';

function App() {
  return (
    <div className="App">
      <Jumbotron />
      <CakeList />
    </div>
  );
}

export default App;
