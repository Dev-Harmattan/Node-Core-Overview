import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

const signup = (email, password) => {
  const salt = randomBytes(16).toString('hex');

  const hashedPassword = scryptSync(password, salt, 64).toString('hex');
  const user = { email, password: `${salt}:${hashedPassword}` };
  // users.push(user);
  return user;
};

const login = (email, password) => {
  const user = users.find((user) => (user.email = email));
  const [salt, key] = user.password.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  if (match) {
    return 'Login successful';
  } else {
    return 'login fail';
  }
};
