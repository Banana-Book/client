import banana from '../../assets/img/banana.png';
import './loadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading">
      <img className="dot" src={banana} />
      <img className="dot" src={banana} />
      <img className="dot" src={banana} />
      <img className="dot" src={banana} />
    </div>
  );
}
