

//class的写法

import React, { Component, PropTypes } from 'react';
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
 class Notification extends Component {
	constructor(props) {
		super(props);
		this.timer = null;
    this.state = {
      visible: false,
    };
	}
	componentDidMount(){
		this.enter();
	}
	componentWillUnmount(){
		clearTimeout(this.timer);
	}
	enter = () => {
		if( duration > 0 ){
			this.timer = setTimeout(() => {
				this.leave();
			}, duration*1000);
		}
  }
  leave = () => {
    this.setState({
      visible: false,
    },()=>{
			let {onClose}=this.props;
    	clearTimeout(this.timer);
    	onClose&&onClose();
    });
  }
	render() {
		let {title,description,theme}= this.props;

		return (
			<div className="elf-notification" style={{display:`${this.state.visible?'block':'none'}`}}>
				<div className="elf-notification-notice">
					{!!theme&&<p className="elf-notification-notice-icon"><Svg iconId={`svg-${theme}`} /></p>}
					<div className="elf-notification-notice-content">
						<h4 className="elf-notification-notice-title">{title}</h4>
						<div className="elf-notification-notice-desc">{description}</div>
					</div>
					<p className="elf-notification-notice-colse" title="关闭" onClick={()=>this.leave()}><Svg/></p>
				</div>
			</div>
		)
	}
}
let StaticNotice = {
	default: (options) => {
		let opt = Object.assign({},option,options);
		let {title,description,theme, callback, duration} = opt;
		let div = document.createElement('div');
		document.body.appendChild(div);
		ReactDOM.render((
			<Notification
				visible={ true }
				title={title}
				description={description}
				duration={duration}
				theme={theme}
				onClose={ () => {
					ReactDOM.unmountComponentAtNode(div);
					document.body.removeChild(div);
					callback && callback();
				}}>
			</Notification>), div);
	},
	config:()=>{
		config.duration = 5000;
	},
	open:(options={})=>{
		StaticNotice.default(options);
	},
	info: (options={}) => {
		StaticNotice.default({...options,theme:'info'});
	},
	success: (options={}) => {
		StaticNotice.default({...options,theme:'success'});
	},
	warning: (options={}) => {
		StaticNotice.default({...options,theme:'warning'});
	},
	error: (options={}) => {
		StaticNotice.default({...options,theme:'error'});

	}
} 

export default StaticNotice;