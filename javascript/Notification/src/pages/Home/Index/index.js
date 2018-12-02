/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 推荐音乐
 */

import React, { Component ,useState } from 'react';
import classnames from 'classnames';
import {Notification} from 'src/components/common';

import './Home.scss';

function Example(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, getSount] = useState(0);
  console.log(props);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => getSount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
var i = 0;
class Home extends Component{
  test=()=>{
    i++;
    Notification.open({
      title:"Open方法",
      description:"现在在测试一个open方法的调用"+i
    })
  }
	render(){
		return ( 
			<div className="i-home">
         <button onClick={()=>this.test()}>测试通知</button>
				<Example options={{tops:1234}} test="12345" />
			</div>
		);
	}
};

export default Home;