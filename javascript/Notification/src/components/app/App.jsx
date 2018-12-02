/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpack配置 demo ,苏南整理，QQ群: 912594095
 */

import React, { Component, PropTypes } from 'react'
import  { Link } from 'react-router'
import './App.scss';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className="app-container">
				<nav className="nav flex">
					<Link to="/cubes/home" activeClassName="active">首页</Link>
					<Link to="/cubes/list" activeClassName="active">列表</Link>
					<Link to="/cubes/detail" activeClassName="active">详情</Link>
				</nav>
				{this.props.children}
			</div>
		)
	}
}

export default Index;