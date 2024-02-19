import PaymentStatus from '../../enums/PaymentStatus';
import User from '../User/User';

interface Payment {
  user: User;
  status: PaymentStatus;
  card: {
    number: string;
    cvc: string;
    expires: Date;
  };
}

export default Payment;
