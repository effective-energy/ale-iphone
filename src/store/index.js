import WalletsStore from './WalletsStore';
import UserStore from './UserStore';
import SystemStore from './SystemStore';
import TransactionsStore from './TransactionsStore';
import NotificationsStore from './NotificationsStore';

export default {
  walletsStore: new WalletsStore(),
  userStore: new UserStore(),
  systemStore: new SystemStore(),
  transactionsStore: new TransactionsStore(),
  notificationsStore: new NotificationsStore(),
};