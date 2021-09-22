import './home.css';
import btn from './img/enterButton.png';
import magicBlue from './img/magicCircleBlue.png';
import magicMagenta from './img/magicCircleMagenta.png';

function Home() {
  return (
    <div className="App">
      <header>
      </header>
      <div className='magic'>
        <img className='magenta' src={magicMagenta} alt='' />
      </div>
      <div className='magic'>
        <img className='blue' src={magicBlue} alt='' />
      </div>
      <div className='enterBtn'>
        <img src={btn} alt='' />
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

export default Home;
