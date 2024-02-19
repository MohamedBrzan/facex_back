import Payment from '../Payment/Payment';
import User from '../User/User';

interface Ad {
  user: User;
  images?: string[];
  videos?: string[];
  start: Date;
  end: Date;
  tags: string[];
  ages: {
    from: number;
    to: number;
  };
  payment: Payment;
}

export default Ad;
