/*
 * @authors :Bin Mei
 * @date    :2018-11-30
 * @description： svg共用组件
 */

import React, { Component} from 'react'
import classnames from 'classnames';

function Svg(props={}){
	const { iconId="svg-close",size='',customLink="",title="", className='' } = props;
	const cls = classnames("svg-icon",{
		[`${className}`]:true,
		[`size-${size}`]:true
	});
	const link = (customLink?customLink:(require(`./images/icon.svg`)+`#${iconId}`));
	return (
		<svg className={cls} title={title} >
			<use xlinkHref={link}  />
		</svg>
	)
}

export default Svg
