# 介绍

### 前言

#### 基于Vue3.0、Vite 、 element-plus、TypeScript的后台解决方案。可以用来作为项目的启动模版



### 代码仓库

* ts版本：https://gitee.com/ianj/vue-admin-template
* js版本：https://gitee.com/ianj/element-admin-template



### 环境准备

你的本地环境需要安装 yarn、node、git



### 目录结构

```sh
├── mock # mock数据
├── public # 静态资源
├── src # 项目代码
│   ├── api #请求相关
│   ├── assets # 静态资源
│   ├── components # 组件
│   ├── directives # 指令
│   ├── enums # 常量，枚举
│   ├── hooks # hooks
│   ├── layout # 布局
│   ├── router #路由，菜单等
│   ├── settings # 配置文件
│   ├── store # vuex
│   ├── styles  # 样式
│   ├── utils # 工具类
│   └── views # 页面
│   ├── main.ts # 入口文件
└── types # 类型定义
```



### 快速上手

#### 代码获取

```sh
# clone 代码
git clone https://gitee.com/ianj/vue-admin-template.git
```

#### 安装依赖

在项目根目录下,打开命令窗口执行,耐心等待安装完成即可

```sh
yarn
# or
npm install
```

#### 运行项目

```sh
npm run start
# or
npm run dev
```



### 路由配置

在 `src/router/routes` 内不配置

#### 一级路由

```
import type { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw[] =  [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: {
      icon: 'el-icon-user-solid',
      title: 'About',
      orderNo: 10000,
    },
  },
]

export default route;
```

#### 多级路由

```ts
import type { AppRouteModule } from '@/router/types';
import { LayoutParentView } from '@/router/constant';

const route: AppRouteModule = {
  path: '/menus',
  name: 'Menus',
  component: LayoutParentView,
  redirect: '/menus/menus1',
  meta: {
    icon: 'el-icon-menu',
    title: 'Menus',
  },
  children: [
    {
      path: '/menus/menus1',
      name: 'MenusMenus1',
      component: LayoutParentView,
      redirect: '/menus/menus1/menus1-1',
      meta: {
        icon: 'el-icon-menu',
        title: 'Menus1',
        parentPath: '/menus',
      },
      children: [
        {
          path: '/menus/menus1/menus1-1',
          name: 'MenusMenus1Menus1-1',
          component: () => import('@/views/menus/menus1/menus1-1/index.vue'),
          meta: {
            icon: 'el-icon-menu',
            title: 'Menus1-1',
            parentPath: '/menus/menus1',
          },
        },
        {
          path: '/menus/menus1/menus1-2',
          name: 'MenusMenus1Menus1-2',
          component: () => import('@/views/menus/menus1/menus1-2/index.vue'),
          meta: {
            icon: 'el-icon-menu',
            title: 'Menus1-2',
            parentPath: '/menus/menus1',
          },
        },
      ]
    },
    {
      path: '/menus/menus2',
      name: 'MenusMenus2',
      component: () => import('@/views/menus/menus2/index.vue'),
      meta: {
        icon: 'el-icon-menu',
        title: 'Menus2',
        parentPath: '/menus',
      },
    }
  ],
};

export default route;
```



### Meta 配置说明

```ts
{
  // title
  title: string;
    
  // 图标，也是菜单图标
  icon?: string;
  
  // 父级路径
  parentPath?: string;
    
  // 可以访问的角色
  roles?: RoleEnum[];

  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  currentActiveMenu?: string;

  // 当前路由不再菜单显示
  hideMenu?: boolean;

  // 是否外部链接
  isLink?: boolean;

  // 是否iframe
  isIframe?: boolean;

  // 内嵌iframe的地址或外部链接地址
  linkUrl?: string;
  
  // 菜单排序。越大排名越后面
  orderNo?: number;
}
```



### 样式

项目中使用的通用样式,都存放于styles下面

```sh
.
├── app.scss #	布局样式
├── element.scss # element 一些样式覆盖
├── index.scss # 入口
├── base.scss # 公共类
├── transition # 动画相关
└── variables.scss # 变量
```

