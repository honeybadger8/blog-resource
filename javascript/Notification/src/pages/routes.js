/*
 * @authors :Bin Mei
 * @date    :2018-08-08
 * @description：懂你的魔方 -- 项目根路由
 */
import Home_route from './Home/route';

const routes = {
  path: '/cubes',
  component: require('../components/app'),
  indexRoute:{ onEnter: (nextState, replace) => replace('/cubes/home') }, //默认重定向到->首页
  childRoutes: [
    ...Home_route,
    {
      path: '*',
      getComponent(nextState, callback) {
        require.ensure([], require => {
            callback(null, require('./NotFoundPage'))
        })
      }
    }
  ]
}

export default routes



















