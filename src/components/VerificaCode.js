import React, {Component} from 'react';
import { InputItem,Button,Toast } from 'antd-mobile';
import '../styles/components/verificaCode.css';
import checkCode from '../assets/check_code.png'
import {isPhone} from '../utils/validate'
// 实际开发过程中使用此接口
// const checkCode = '/api/verify/imgCode?type=forget'
class verificaCode extends Component {
    constructor(props) {
          /** 父组件传递参数
           * codeType   验证码类型
           * 1. IMG：图片验证码
           * 调用的时候使用  this.refs.verifica_code.getImgCode()
           * 2. SMS：短信验证码
           *     1) codePhone  接受验证码的手机号
           *     2) codeTime   重新发送验证码的时长，默认为60s （选填）
           */
        super(props);  
        this.state = {
            sendSuccess: false, //true验证码发送成功 false验证码未发送
            time: 0 //时间
        };
    }
    componentDidMount=()=> {}
    componentWillUnmount=()=> {}
    // 图片验证码获取事件
    getImgCode = ()=>{
        // 实际开发过程中使用此接口
        // this.refs.imgCode.src = `/api/verify/imgCode?r=${Math.random()}`;
        console.log('获取验证码')
    }
    getSMSCode = (codePhone,codeTime) =>{
        //判断手机号是否正确
        if (!isPhone(codePhone)) return Toast.fail('请检查手机号是否正确');
        else{
            //初始化倒计时长
            this.setState({ 
                time:codeTime || 60 //默认验证码时间为60s
            })
            this.countDown();
            // // 发送获取验证码请求
            // this.http.verify.SMSCode({
            //     mobile: codePhone,
            //     r: Math.random()
            // })
            // .then(res => {
            //     //请求成功则禁用表单开启倒计时(这里可以根据状态码判断)
            //     this.countDown(true);
            //     Toast.fail(res.msg)
            // })
            // .catch((err) => {
            //     //返回接口错误信息
            //     console.log(err)
            // });
        }
    }
    //定时器
    countDown() {
        this.setState({ sendSuccess:true})
        this.Timer= setInterval(() => {
            if (this.state.time <= 1){
                this.setState({ sendSuccess:false,time:0 });
                clearInterval(this.Timer);
            }else{
                this.setState({ time: this.state.time-1 });
            } 
        }, 1000);
      }
      //获取输入验证码信息
      getInputValue=()=>{
          return this.refs.codeValue.state.value
      }
    // 短信验证码方法
    render() {
        const { className, style, codeType, codePhone, codeTime} = this.props;
        const {sendSuccess, time} = this.state;
        let extraEle;
        // 再此处判断与渲染ele结构
        if(codeType==='IMG') extraEle = <img src={checkCode} ref="imgCode" alt="验证码" onClick={this.getImgCode}/>;
        else extraEle = <Button className="btn_extra" disabled={sendSuccess}
                onClick={this.getSMSCode.bind(this,codePhone,codeTime)}
                style={{backgroundColor:sendSuccess ? '#999' : '#f70'}}>
                {sendSuccess ? time+'s' : '获取验证码'}
            </Button>;
        return (
            <div id="verificaCode" className={className} style={style}>
                <div className="input_box verificaCode">
                    <InputItem className="input_self" 
                        ref="codeValue"
                        placeholder="请输入验证码" 
                        extra={extraEle}>
                        <div className={codeType==='IMG' ?'checkImg input_icon':'checkPhone input_icon'}/>
                    </InputItem>
                </div>
            </div>
        );
    }
}

export default verificaCode;
