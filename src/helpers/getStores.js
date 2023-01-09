/* eslint-disable no-magic-numbers */
import { FaPlaystation, FaSteamSquare, FaXbox } from 'react-icons/fa';
import { SiEpicgames } from 'react-icons/si';

export const getStores = (id) => {
  switch (id) {
  case 1:
    return <FaSteamSquare />;
  case 3:
    return <FaPlaystation />;
  case 7:
    return <FaXbox />;
  case 11:
    return <SiEpicgames />;
  default:
    break;
  }
};

export const getNameStore = (store) => {
  switch (store) {
  case 1:
    return 'Steam';
  case 3:
    return 'Playstation';
  case 7:
    return 'Xbox';
  case 11:
    return 'Epic Games';
  default:
    break;
  }
};
