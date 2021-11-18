import './loader.css';
import imgLeft from './magicCircleMagenta.png';
import imgRight from './magicCircleBlue.png';


export default function Loader({ text }) {

  return (
    <div className='loader'>
      <div className='imageCont'>
        <img src={imgLeft} alt='' />
        <img src={imgRight} alt='' />
        <div className='centralText'>
          <span>{text}</span>
        </div>
      </div>
    </div>
  )
}
