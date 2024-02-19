import NotificationStatus from '../../enums/NotificationStatus';
import User from '../User/User';

interface Notification {
  from: User;
  title: string;
  link: string;
  status: NotificationStatus;
}

export default Notification;
