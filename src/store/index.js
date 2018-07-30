import WalletsStore from './WalletsStore';
import UserStore from './UserStore';
import SystemStore from './SystemStore';
import TransactionsStore from './TransactionsStore';

export default {
  walletsStore: new WalletsStore(),
  userStore: new UserStore(),
  systemStore: new SystemStore(),
  transactionsStore: new TransactionsStore(),
};