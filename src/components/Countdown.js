import React, {Component} from 'react';
import {add0} from '../utils/utils' // 引入补零方法

class Countdown extends Component {
    constructor(props) {
        /** 父组件传递参数
         *  startTime  倒计时开始时间戳 10位 必填
         *  endTime    倒计时结束时间戳 10位 必填
         *  msg        倒计时结束时显示文本 '默认为【倒计时已结束】'
         */
        super(props);      // 当父组件向子组件传递数据时，需要在这里传入props。
        this.state = {     // 通过state来定义当前组件内部自己的数据
            clocker:''
        };
    }
    componentDidMount=()=> {
        // this.props.endTime 获取父组件中的数据
        let timeLag = parseInt(this.props.endTime,10) - parseInt(this.props.startTime,10);
        this.timer = setInterval(() => {       // 创建倒计时定时器
            let time = timeLag--;              // time为两个时间戳之间相差的秒数
            let _clocker = '';                 // 打印出时间对象
            let timeobj = {
                seconds: time % 60,
                minutes: Math.floor(time / 60) % 60,
                hours: Math.floor(time / 60 / 60) % 24,
                days: Math.floor(time / 60 / 60 / 24),
                weeks: Math.floor(time / 60 / 60 / 24 / 7),
                months: Math.floor(time / 60 / 60 / 24 / 30),
                years: Math.floor(time / 60 / 60 / 24 / 365)
            };
            _clocker = `${add0(timeobj.days)} 天 ${add0(timeobj.hours)} 小时 ${add0(timeobj.minutes)} 分 ${add0(timeobj.seconds)} 秒`
            if (time <= 0) { // 当时间差小于等于0的时候证明倒计时已经过结束
                _clocker = this.props.msg || "倒计时已结束";
                clearInterval(this.timer)
            }
            this.setState({
                clocker:_clocker  
            })
        }, 1000);
    }
    componentWillUnmount=()=> {
        this.timer()   // 启动定时器
    }
    render() {
        return (<p className={this.props.className}>{this.state.clocker}</p>);
    }
}

export default Countdown;