import Expressions from '../../Types/Post/Expressions';
import Album from '../Album/Album';
import User from '../User/User';

interface Video {
  user: User;
  video: Video;
  views: User[];
  comments: Comment[];
  expressions: Expressions;
  shares: User[];
  saves: User[];
  ref: Album;
}

export default Video;
