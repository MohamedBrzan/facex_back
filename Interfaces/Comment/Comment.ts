import Expressions from '../../Types/Post/Expressions';
import VisiblePrivacy from '../../enums/VisiblePrivacy';
import Blog from '../Blog/Blog';
import Post from '../Post/Post';
import Reel from '../Reel/Reel';
import User from '../User/User';
import Reply from './Reply';

interface Comment {
  user: User;
  ref: {
    post?: Post;
    blog?: Blog;
    reel?: Reel;
  };
  message: string;
  replies?: Reply[];
  expressions?: Expressions;
  visiblePrivacy: VisiblePrivacy;
}

export default Comment;
