/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpack配置 demo ,苏南整理，QQ群: 912594095
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



















