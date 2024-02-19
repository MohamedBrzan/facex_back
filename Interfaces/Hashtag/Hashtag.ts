import User from '../User/User';

interface HashTag {
  user: User;
  text: string;
  followers: User[];
}

export default HashTag;
