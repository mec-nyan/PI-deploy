import './side.css';


function SideBar() {

  return (
    <div className='side'>
      <h2>My games</h2>
      <ul>
        <li>Super Henry Bros.</li>
        <li>Devs May Cry</li>
        <li>Callback of Duty</li>
        <li>Recursive Evil II</li>
        <li>Mortal Kallback</li>
        <li>Full Stack Alchemist</li>
      </ul>

      <div className='lineSide'></div>

      <h2>Favourites</h2>
      <ul>
        <li>Nier: Automata</li>
        <li>Guilty Gear</li>
        <li>Dead Or Alive</li>
      </ul>

      <div className='lineSide'></div>

      <h2>Recommended</h2>
      <ul>
        <li>Web Pack Man</li>
        <li>Halo: R.E.A.C.T.</li>
        <li>Routers from Hell</li>
        <li>DOM Eternal</li>
        <li>Code Wars</li>
        <li>ConstLetVar-nia</li>
        <li></li>
        <li></li>
      </ul>

      <div className='lineSide'></div>
    </div>
  );
}

export default SideBar;
