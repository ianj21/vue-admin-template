
import request from '@/utils/axios';

const urlPrefix: string = '/mock';

export function login(data: object): object {
  return request({
		url: `${urlPrefix}/api/login`,
    method: 'post',
    data
  });
}

export function getUserInfo(): object {
  return request({
		url: `${urlPrefix}/api/user`,
		method: 'get',
  });
}