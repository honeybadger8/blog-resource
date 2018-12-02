/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 首页模块
 */


module.exports = [
	{
		path: 'home',
		indexRoute: {
			getComponent(location, cb) {
				require.ensure([], (require) => {
					cb(null, require('./Index/index'));
				});
			},
		}
	}
]
	