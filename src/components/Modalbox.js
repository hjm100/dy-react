import React, {Component} from 'react';
import '../styles/components/Modalbox.css';
class Modalbox extends Component {
    constructor(props) {
        /** 父组件传递参数
         * 弹框组件开发
         * @argument type         弹框类型(alert confirm default[不显示按钮]) 
         * @argument title        弹框标题
         * @argument msg          弹框显示信息
         * @argument cancelText   取消按钮显示文本 （不传则不显示）
         * @argument okText       确定按钮显示文本
         */
        super(props);  
        this.state = {
            type:'',
            title:'',
            msg:'',
            cancelText:'',
            okText:'',
            display:{'display':'none'}
        };
    }
    componentDidMount=()=> {}
    componentWillUnmount=()=> {}
    // 打开弹框
    openBox=(type,title,msg)=>{
        this.setState({ 
            display:{'display':'block'},
            title:title,
            msg:msg
        })
        if(type==='alert'){
            this.setState({ 
                cancelText:'知道了',
                okText:""
            })
        }else if(type==='confirm'){
            this.setState({ 
                cancelText:"取消",
                okText:"确定"
            })
        }else{
            return false;
        }
    }
    //关闭弹框
    close=()=>{
        this.setState({ 
            display:{'display':'none'},
            type:'',
            title:'',
            msg:'',     
        })
    }
    // 确定按钮方法
    cancel=(callback)=>{
        if (callback && typeof(callback) === "function") callback();  
    } 
    ok = (callback) =>{
        if (callback && typeof(callback) === "function") callback();   
    }
    // 取消按钮方法
    render() {
        const { children, className, cancelText, okText, okClick, cancelClick} = this.props;
        // 根据key值来判断弹框显示
        let childrenEle = [],hdEle,bdEle;
        if(children){
            if(children instanceof Array) childrenEle = children;
            else childrenEle.push(children);
            childrenEle.forEach((c)=>c.key==='hd'? hdEle = c : bdEle = c)
        }
        return (
            <div id="Modalbox" className={className} style={this.state.display}>
                <div className="modal-mask" onClick={this.close}></div>
                <div className="modal-body animation_body">
                    <div className="modal__hd">
                        {hdEle?hdEle:<h3 className="modal__hd_text">{this.state.title}</h3>}
                    </div>  
                    <div className="modal__bd">
                        {bdEle?bdEle:<p className="modal__bd_text">{this.state.msg}</p>}
                    </div>
                    <div className="modal__ft">
                        {(!cancelText&&this.state.cancelText==='')||<button className="btn cancel_btn" onClick={cancelClick}>{cancelText||this.state.cancelText}</button>}
                        {(!okText&&this.state.okText==='')||<button className="btn ok_btn" onClick={okClick}>{okText||this.state.okText}</button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modalbox;

/**对于模态弹框的了解
 * 一、alert 弹框样式
 *   1. 不带底部按钮
 *   2. 有一个底部按钮 （知道了）
 * 二、confirm 确认框
 *   1. 有两个底部按钮  （确定  取消）
 * 三、开放接口：
 *   1. 弹框样式
 *   2. 弹框按钮是否显示（显示个数根据父组件传递）
 * 四、弹框事件：
 *   1. 显示弹框
 *   2. 关闭弹框
 *   3. 确认按钮执行事件
 *   3. 取消按钮执行事件
 * 五、弹框高级 Slot
 *   1. 开放modal__hd的子标签设置
 *   2. 开放modal__bd的子标签设置
 */