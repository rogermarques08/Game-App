import { FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';

const getIcon = (platform) => {
  switch (platform) {
  case 'Xbox':
    return <FaXbox />;
  case 'PC':
    return <FaWindows />;
  case 'PlayStation':
    return <FaPlaystation />;
  case 'Nintendo':
    return <SiNintendoswitch />;
  default:
    break;
  }
};

export default getIcon;
