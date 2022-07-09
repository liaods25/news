'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    jwt
  } = app;
  router.get('/', controller.test.index); //列表
  router.get('/hot_video', controller.test.list); //列表

  // 用户相关
  router.get('/user/list', controller.user.list); //列表
  router.post('/user/register', controller.user.register); //注册
  router.post('/user/login', controller.user.login); //登录
  router.post('/user/create', controller.user.register); //增加
  router.get('/user/info/:uid', controller.user.info); //详情
  router.delete('/user/delete/:uid', controller.user.delete); //删除
  router.put('/user/update/', controller.user.update); //修改

  // 生气状态
  router.get('/category/list', controller.category.list); //列表
  router.post('/category/create', controller.category.create); //增加
  router.get('/category/detail/:cid', controller.category.detail); //详情
  router.delete('/category/delete/:cid', controller.category.delete); //删除
  router.put('/category/update/', controller.category.update); //修改

  // 文章相关
  router.get('/article/list', controller.article.list); //列表
  router.post('/article/create', controller.article.create); //增加
  router.get('/article/detail/:aid', controller.article.detail); //详情
  router.delete('/article/delete/:aid', controller.article.delete); //删除
  router.put('/article/update/', controller.article.update); //修改

  // 评论相关
  router.get('/comment/list', controller.comment.list); //列表
  router.post('/comment/create', controller.comment.create); //增加
  router.get('/comment/detail/:aid', controller.comment.detail); //详情
  router.delete('/comment/delete/:aid', controller.comment.delete); //删除
  router.put('/comment/update/', controller.comment.update); //修改

  // Banner相关
  router.get('/banner/list', controller.banner.list); //列表
  router.post('/banner/create', controller.banner.create); //增加
  router.get('/banner/detail/:bid', controller.banner.detail); //详情
  router.delete('/banner/delete/:bid', controller.banner.delete); //删除
  router.put('/banner/update/', controller.banner.update); //修改

  // 配置相关
  router.get('/config/list', controller.config.list); //列表
  router.post('/config/create', controller.config.create); //增加
  router.get('/config/detail/:qid', controller.config.detail); //详情
  router.delete('/config/delete/:qid', controller.config.delete); //删除
  router.put('/config/update/', controller.config.update); //修改

  //通用相关
  router.post('/common/upload', controller.common.upload); //上传
};