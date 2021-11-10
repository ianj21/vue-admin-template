import { sendSuccess, sendFail } from './utils';

const list = [
  {
    userName: 'test',
    password: '123456',
    id: '1',
    roles: ['test'],
  },
  {
    userName: 'admin',
    password: '123456',
    id: '2',
    roles: ['admin'],
  },
  {
    userName: 'super',
    password: '123456',
    id: '3',
    roles: ['super'],
  },
];

export default [
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: (ctx) => {
      const { userName, password } = ctx.body;
      const user = list.find(v => v.userName === userName && v.password === password);
      if (!user) {
        return sendFail({
          msg: '用户不存在'
        });
      }
      const data = user.id + Math.random().toString(36).slice(-8);
      return sendSuccess(data);
    },
  },
  {
    url: '/api/user',
    timeout: 1000,
    method: 'get',
    response: (ctx) => {
      const token = ctx.headers.authorization;
      const id = token.substring(0, 1);
      const data = list.find(v => v.id === id);
      return sendSuccess(data);
    },
  },
]
