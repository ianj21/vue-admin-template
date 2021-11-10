import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index.ts';
import { getSession } from '@/utils/storage';

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
    // 在发送请求之前做些什么 token
    const token = getSession('token');
    if (token) {
      config.headers.authorization = token;
    }
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const { code, msg } = response.data;
		if (code && code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (code === 401 || code === 403) {
        // 清除浏览器全部临时缓存
				router.push('/login'); // 去登录页面
			}
			ElMessage.error(msg);
		} else {
			return response.data;
		}
	},
	(error) => {
		// 对响应错误做点什么
		ElMessage.error('请求服务异常，请刷新后重试');
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
