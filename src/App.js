import './App.css';
import CakeList from './components/Cake/CakeList.js';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import Logo from './components/Logo/Logo.js';

function App() {
  return (
    <div className="App">
      <Logo />
      <Jumbotron />
      <CakeList />
    </div>
  );
}

export default App;
