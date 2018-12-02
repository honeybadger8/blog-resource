
//function hooks的写法


import React, { Component,useState, useEffect,useContext  } from 'react';
import ReactDOM from 'react-dom';
import Svg from '../Svg';

import './Notification.scss';
const config={
	duration:4,
	placement:"left"
};
const option={
	icon:"",
	duration:config.duration,
	title:"提示",
	description:"",
	theme:"",
	callback:()=>{}
}

const prefixCls = 'elf-notification';
function Notification(props){
let timer = null;
	const [visible, setVisible] = useState(false);
	let {title,description,duration,theme,onClose,}= props;
	let leave = () => {

		clearTimeout(timer);
		setVisible(false);
		onClose&&onClose();
	}
	
	let enter = () => {
		// clearTimeout(timer);
		setVisible(true);
		if( duration > 0 ){
			timer = setTimeout(() => {
				console.log(123456,timer)
				leave(timer);
			}, duration*1000);
			timer = timer;
		}
	}
	useEffect(()=>{
		return enter();
	},[])

	return (
		<div className={`${prefixCls}-notice`} style={{display:`${visible?'':'none'}`}}>
			{!!theme&&<p className={`${prefixCls}-notice-icon`}><Svg iconId={`svg-${theme}`} /></p>}
			<div className={`${prefixCls}-notice-content`}>
				<h4 className={`${prefixCls}-notice-title`}>{title}</h4>
				<div className={`${prefixCls}-notice-desc`}>{description}</div>
			</div>
			<p className={`${prefixCls}-notice-colse`} title="关闭" onClick={()=>{leave(timer)}}><Svg/></p>
		</div>
	);
};

let StaticNotice = {
	noticeId:`notice${Math.random().toString(16).substr(6)}`,
	isConfig:false,
	config:()=>{
		if(!StaticNotice.isConfig){
			let noticeContainer = document.createElement('div');
			noticeContainer.id = StaticNotice.noticeId;
			noticeContainer.className = prefixCls;
			document.body.appendChild(noticeContainer);
			StaticNotice.isConfig = true;
		};
	},
	open: (options) => {
		StaticNotice.config();
		let opt = Object.assign({},option,options);
		let {title,description,theme, callback, duration} = opt;
		let div = document.createElement('div');
		const parentNode = document.querySelector(`#${ StaticNotice.isConfig? StaticNotice.noticeId:'body'}`);
		parentNode.appendChild(div);

		ReactDOM.render((
			<Notification
				visible={ true }
				title={title}
				description={description}
				duration={duration}
				theme={theme}
				onClose={ () => {
					callback && callback();
					div&&parentNode.removeChild(div);
					div&&ReactDOM.unmountComponentAtNode(div);
				}}>
			</Notification>), div);
	},
	info: (options={}) => {
		StaticNotice.open({...options,theme:'info'});
	},
	success: (options={}) => {
		StaticNotice.open({...options,theme:'success'});
	},
	warning: (options={}) => {
		StaticNotice.open({...options,theme:'warning'});
	},
	error: (options={}) => {
		StaticNotice.open({...options,theme:'error'});

	}
} 

export default StaticNotice;