import WalletsStore from './WalletsStore';
import UserStore from './UserStore';
import SystemStore from './SystemStore';

export default {
  walletsStore: new WalletsStore(),
  userStore: new UserStore(),
  systemStore: new SystemStore(),
};