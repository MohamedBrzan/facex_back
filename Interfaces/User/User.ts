import FilterContent from '../../enums/FilterContent';
import VisiblePrivacy from '../../enums/VisiblePrivacy';
import Ad from '../Ad/Ad';
import Album from '../Album/Album';
import Blog from '../Blog/Blog';
import Comment from '../Comment/Comment';
import Reply from '../Comment/Reply';
import Hashtag from '../Hashtag/Hashtag';
import Job from '../Job/Job';
import Notification from '../Notification/Notification';
import Payment from '../Payment/Payment';
import Post from '../Post/Post';
import Reel from '../Reel/Reel';
import Video from '../Video/Video';

type Link = {
  for: string;
  link: string;
};

type Analytics = {
  count: number;
  name: string;
  percentage: number;
  time: string;
};

type CreatorTools = {
  live: string[];
  events: string[];
  newsletters: string[];
  follow_link: string[];
};

type Preferences = {
  language: {
    app: string;
    content: string;
  };
  auto_videos: boolean;
  sounds_effects: boolean;
  visibility: {
    profile_photos: VisiblePrivacy;
    feed: FilterContent;
  };
  people: {
    also_viewed: boolean;
    unFollowed: User[];
  };
  display: {
    dark_mode: boolean;
  };
};

interface User {
  id: any;
  _id: string | object | Buffer;
  name?: {
    first: string;
    last: string;
    additional: string;
  };
  email: string;
  password: string;
  images?: string[];
  albums?: Album[];
  videos?: { reacted: Video[]; published: Video[] };
  payments?: Payment[];
  hashtags?: { published: Hashtag[]; reacted: Hashtag[] };
  comments?: { published: Comment[]; reacted: Comment[] };
  replies?: { published: Reply[]; reacted: Reply[] };
  avatar?: string;
  cover?: string;
  bio?: string;
  actively_recruiting?: boolean;
  gender?: string;
  disability?: string;
  headline?: string;
  profession?: string;
  industry?: string;
  role?: string;
  address?: string;
  contact?: {
    profile: string;
    website: string;
    phone: string;
    birthday: {
      day: number;
      month: string;
      year: number;
    };
  };
  analytics?: Analytics[];
  profile_topics?: string[];
  creator_tools?: CreatorTools;
  open_to?: {
    title: string;
    description: string;
  };
  tags?: string[];
  blocks?: User[];
  followers?: User[];
  followings?: User[];
  posts?: { published: Post[]; reacted: Post[] };
  blogs?: { published: Blog[]; reacted: Blog[] };
  jobs?: {
    applied: Job[];
    published: Job[];
    reviewing: Job[];
    interviewing: Job[];
    rejected: Job[];
    approved: Job[];
  };
  shares?: {
    posts: Post[];
    blogs: Blog[];
    reels: Reel[];
    videos: Video[];
  };
  saves?: {
    posts: Post[];
    blogs: Blog[];
    reels: Reel[];
    videos: Video[];
  };
  ads?: Ad[];
  reels?: { reacted: Reel[]; published: Reel[] };
  notifications?: Notification[];
  saved?: [];
  location?: string;
  hyperlinks?: Link[];
  preferences?: Preferences;
  verified?: {
    id: {
      number: number;
      photo: string;
    };
    passport: {
      number: number;
      photo: string;
    };
    isActive: boolean;
  };
  deletion?: {
    executeIn: {
      date: {
        full: string;
        short: string;
      };
      month: number;
      day: number;
    };
    isActive: boolean;
  };
  isDeleted?: boolean;
  isBanned?: boolean;
}

export default User;
