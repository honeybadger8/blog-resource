/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpack配置 demo ,苏南整理，QQ群: 912594095
 */
import React, { Component } from 'react';
import classnames from 'classnames';

import './Home.scss';

class Home extends Component{
	render(){
		return ( 
			<div className="i-home">
				首页测试，
				<p>只加了一个首页，其他菜单都去404了哦</p>
			</div>
		);
	}
};

export default Home;