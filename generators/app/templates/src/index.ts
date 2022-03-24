// 路由配置
export default [
  {
    path: '/(index|home)?',
    controller: () => import('./pages/wealth-seed-template/Controller'),
  },
];
