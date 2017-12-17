import React, { Component } from 'react';
import { render } from 'react-dom';

import './list.css';

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: [10, 134, 188, 23, 45, 88, 103],
    };
    this.maxNum = this.state.orderList[0]; // 图表数据最大值
    this.leftArray = []; // 图表左侧数组
  }

  componentWillMount() {
    // 计算数组最大值
    this.state.orderList.map((value, index) => {
      if(this.maxNum < value) {
        this.maxNum = value;
      }
    });

    let temp = this.maxNum%50;

    if(temp > 0) {
      // 计算图表左侧最大值
      this.maxNum = this.maxNum-temp+50;
    }

    // 构建左侧数组
    for(let i=this.maxNum/50; i >= 0; i--) {
      this.leftArray.push(i*50);
    }
  }

  render() {
    return (
      <div className="orderlist">
        <p className="title">各组待处理订单</p>
        <ul className="left">
          {this.leftArray.map((value, index) => {
            return <li key={index}>{value}</li>
          })}
        </ul>
        <ul className="right">
          {this.state.orderList.map((value, index) => {
            let height = (value/this.maxNum)*200;
            let style = {
              height: height
            };

            return <li className="rli" key={index} style={style}><span className="num">{value}</span></li>
          })}
        </ul>
      </div>
    )
  }
}

render(<OrderList />, document.getElementById('app'));