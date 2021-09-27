import './side.css';


function SideBar() {

  return (
    <div className='side'>
      <h2>My games</h2>
      <ul>
        <li>element 1</li>
        <li>element 2</li>
        <li>element 3</li>
        <li>element 4</li>
      </ul>

      <div className='lineSide'></div>

      <h2>Favourites</h2>
      <ul>
        <li>element 1</li>
        <li>element 2</li>
        <li>element 3</li>
        <li>element 4</li>
      </ul>

      <div className='lineSide'></div>

      <h2>Recommended</h2>
      <ul>
        <li>element 1</li>
        <li>element 2</li>
        <li>element 3</li>
        <li>element 4</li>
      </ul>

      <div className='lineSide'></div>
    </div>
  );
}

export default SideBar;
