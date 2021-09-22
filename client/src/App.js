import './App.css';
import btn from './img/enterButton.png';
import magicBlue from './img/magicCircleBlue.png';
import magicMagenta from './img/magicCircleMagenta.png';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <div className='magic'>
        <img className='magenta' src={magicMagenta} />
      </div>
      <div className='magic'>
        <img className='blue' src={magicBlue} />
      </div>
      <div className='enterBtn'>
        <img src={btn} />
      </div>
      <div className="Slider">
        <div class="big">
          <div class="slide"></div>
          <div class="slide"></div>
          <div class="slide"></div>
          <div class="slide"></div>
          <div class="slide"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
