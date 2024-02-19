import Expressions from '../../Types/Post/Expressions';
import PostStatus from '../../enums/PostStatus';
import VisiblePrivacy from '../../enums/VisiblePrivacy';
import User from '../User/User';

interface Post {
  images?: string[];
  videos?: string[];
  content: string;
  status: PostStatus;
  user: User;
  comments: Comment[];
  expressions: Expressions;
  shares: User[];
  saves: User[];
  visiblePrivacy: VisiblePrivacy;
}

export default Post;
