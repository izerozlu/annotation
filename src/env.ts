import {cleanEnv, num} from 'envalid';

export default cleanEnv(process.env, {
  PORT: num({ desc: 'Application port', default: 5000 }),
});
