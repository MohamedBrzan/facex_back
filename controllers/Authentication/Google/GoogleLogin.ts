import AsyncHandler from '../../../middleware/AsyncHandler';
import passport from 'passport';

export default AsyncHandler(() => {
  console.log('first');
  return passport.authenticate('google', { scope: ['profile'] });
});
