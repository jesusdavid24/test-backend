import { Strategy } from 'passport-local';
import { getUserByEmail } from '@api/users/user.service';
import { comparePassword } from '@utils/bcrypt';

const LocalStrategy = new Strategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        done(null, false, { message: 'unauthorized' });
        return;
      }

      let isMatch = null;

      if (user.password) {
        isMatch = await comparePassword(password, user.password);
      }

      if (!isMatch) {
        done(null, false, { message: 'unauthorized' });
        return;
      }

      done(null, user);
    } catch (exception: unknown) {
      done(exception);
    }
  }
);

export default LocalStrategy;
