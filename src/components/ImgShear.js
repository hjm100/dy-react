import React, {Component} from 'react';
import AlloyCrop from "alloycrop";
import ImageCompressor from "image-compressor.js";
import '../styles/components/ImgShear.css';
import hjm100 from '../assets/hjm100.png'
class ImgShear extends Component {
    constructor(props) {
        /** 父组件传递参数
         * @argument defImg          默认头像显示
         * @argument imgWidth        剪切区的宽
         * @argument imgHeight       剪切区的高
         */
        super(props);  
        this.state = {
            imgSrc:''
        };
    }
    //设置默认参数
    static defaultProps = {
        defImg:hjm100, 
        imgWidth: 250,     
        imgHeight: 250,         
    }
    componentDidMount=()=> {
        //将默认头像复制给imgSrc
        this.setState({ 
            imgSrc:this.props.defImg
        })
    }
    componentWillUnmount=()=> {}
    getImgUrl = () => {
        let _this = this;
        let fileEle = _this.refs.file;
        fileEle.click()
        fileEle.onchange = ()=>{
            let fileData = fileEle.files[0];
            // 如果图片过大压缩图片{https://www.imooc.com/article/40038}
            let maxSize = 100 * 1024; //显示图片最大为100k
            let imgSize = fileData.size;  //获取当前图片的大小
            if (imgSize > maxSize) {
                let radio = maxSize / imgSize; //设置压缩率
                // file:（可选）压缩的目标图像文件，类型是 File 或者 Blob
                new ImageCompressor(fileData, {
                    quality: radio,        // 输出图像的画质，类型是 number。默认值是 undefined。值是0到1之间的数字。
                    convertSize: 1000000,  // 输出图像的文件类型，类型是 number。默认值是 5000000 (5MB)。
                    success(newFile) {
                        //将压缩后的图像(一个Blob对象)。转化成bas64
                        let file = new FileReader();
                        file.readAsDataURL(newFile);
                        file.onload = (e)=>  {
                            _this.getAlloyCrop(e.target.result);
                        };
                    }
                });
            }else{
                let file = new FileReader();
                file.readAsDataURL(fileData);
                file.onload =  (e)=>  {
                    _this.getAlloyCrop(e.target.result);
                };
            }
        }
    };
    getAlloyCrop(file) {
        let _this = this;
        //对图片进行裁剪
        new AlloyCrop({
          image_src: file,
          width: _this.props.imgWidth,
          height: _this.props.imgHeight,
          output: 1,
          ok_text: "剪切",
          cancel_text: "取消",
          ok: function(base64, canvas) {
            //不能去修改父组件的数据，所以要使用一个微数据
            _this.setState({ 
                imgSrc:base64
            })
            // 将base64文件转换为bolb文件
            let formData = new FormData();
            let blob = _this.convertBase64UrlToBlob(base64, "image/png");
            formData.append("file", blob, Date.now() + ".png");
            //在此处发送一个ajax请求
            let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            React.http.user.upload("post", formData, config).then(res => {
               //将后端生成的图片路径抛出
               _this.props.getImgUrl(res.url)
            });
            //清除一下file中的数据防止上传同一张图片不执行事件
            _this.refs.file.value = ''
          },
          cancel: function() {
              console.log('你取消了剪切')
              _this.refs.file.value = ''
          }
        });
    }
    /**
     * base64转文件流
     * @param {base64} //base64数据
     * @param {string} //format格式
     * @return {file}  文件blob
     */
    convertBase64UrlToBlob(base64, mimeType) {
        let bytes = window.atob(base64.split(",")[1]);
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        let _blob = new Blob([ab], { type: mimeType });
        return _blob;
    }
    render() {
        return (
            <div id="ImgShear" onClick={this.getImgUrl}>
                <img src={this.state.imgSrc} alt="图片"/>
                <input id="file" ref="file" type="file" accept="image/gif, image/jpeg, image/png"/>
            </div>
        );
    }
}

export default ImgShear;