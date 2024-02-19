import Image from '../Image/Image';
import User from '../User/User';

interface Album {
  user: User;
  title: string;
  description: string;
  images?: Image[];
}

export default Album;
