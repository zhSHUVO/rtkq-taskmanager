import ferdous from '../assets/avatars/ferdous.png';
import akash from '../assets/avatars/akash.png';
import almas from '../assets/avatars/almas.png';
import riyadh from '../assets/avatars/riyadh.png';
import sadh from '../assets/avatars/sadh.png';
import salahuddin from '../assets/avatars/salahuddin.png';
import sumit from '../assets/avatars/sumit.png';

export default function Member({ member }) {
  const { name, avatar } = member;

  let avtrSelection;
  switch (avatar) {
    case '/images/avatars/ferdous.png':
      avtrSelection = ferdous;
      break;
    case '/images/avatars/akash.png':
      avtrSelection = akash;
      break;
    case '/images/avatars/almas.png':
      avtrSelection = almas;
      break;
    case '/images/avatars/riyadh.png':
      avtrSelection = riyadh;
      break;
    case '/images/avatars/sadh.png':
      avtrSelection = sadh;
      break;
    case '/images/avatars/salahuddin.png':
      avtrSelection = salahuddin;
      break;
    case '/images/avatars/sumit.png':
      avtrSelection = sumit;
      break;
    default:
      avtrSelection = undefined;
  }

  return (
    <div className="checkbox-container">
      <img src={avtrSelection} className="team-avater" alt="avatar" />
      <p className="label">{name}</p>
    </div>
  );
}
