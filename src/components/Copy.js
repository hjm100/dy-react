import React, {Component} from 'react';
import Clipboard from "clipboard";
import {Modal} from 'antd-mobile';      // 引入加载组件
class Copy extends Component {
    constructor(props) {
        /** 父组件传递参数
         * 拷贝功能组件，点击按钮拷贝传入数据
         * @argument copyBtnId    创建的拷贝按钮id
         * @argument copymessage  需要拷贝的信息
         * @argument className    按钮的css样式
         * @argument copyBtnTxt   按钮内容
         */
        super(props);  
        this.state = {};
    }
    componentDidMount=()=> {
        this.copy()
    }
    copy=()=> {
        let clipboard = new Clipboard("#" + this.props.copyBtnId);
        clipboard.on("success", e => {
          Modal.alert('复制成功', this.props.copymessage)
          clipboard.destroy();          // 释放内存
        });
        clipboard.on("error", e => {
          Modal.alert('复制失败', '该浏览器不支持拷贝')
          clipboard.destroy();         // 释放内存
        });
      }
    render() {
        return (
            <button className={this.props.className} id={this.props.copyBtnId} 
                data-clipboard-text={this.props.copymessage} 
                onClick={this.copy}>
                {this.props.copyBtnTxt}
            </button>
        );
    }
}

export default Copy;