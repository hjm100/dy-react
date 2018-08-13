import React, {Component} from 'react';
import '../styles/components/GetLocation.css'
const AMap = window.AMap;
const AMapUI = window.AMapUI;
//思路进入页面时先定位
//可以通过搜索选址
//可以通过拖拽微调选址
class GetLocation extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            selectionCenter:[]
        };
    }
    componentWillMount (){

    }
    componentDidMount=()=> {
      this.getLocation()
      this.searchSiteSelection()
    }
    // 12,[116.171731,40.06682]
    //获取当前定位
    getLocation = ()=>{
        let that = this
        /***************************************
          由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
         ***************************************/
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
            let poi = data.position.toString().split(",");    
            that.dragSiteSelection(15,poi)
        }
        //解析定位错误信息
        function onError(data) {
            alert('定位失败')
        }
    }
    //通过搜索来获取定位信息
    searchSiteSelection=()=>{
        let that = this
        AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
            let poiPicker = new PoiPicker({
                input: 'pickerInput'
            });
            //初始化poiPicker    
            window.poiPicker = poiPicker;          
            //选取了某个POI
            poiPicker.on('poiPicked', function(poiResult) {  
                let poi = poiResult.item.location.toString().split(",");    
                that.dragSiteSelection(15,poi)
            });
        });
    }

    //拖拽位置选择
    dragSiteSelection=(zoom,center)=>{
        let tant = this
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            let map = new AMap.Map('container', {
                zoom: zoom,
                resizeEnable: true,
                center: center
            })
            let positionPicker = new PositionPicker({
                mode:'dragMap',//设定为拖拽地图模式，可选'dragMap[拖拽地图]'、'dragMarker[拖拽点]'，默认为'dragMap'
                map: map,
                // iconStyle: { //自定义图标外观
                //     url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png', //图片地址
                //     ancher: [24, 40], //要显示的点大小，将缩放图片
                //     size: [48, 48]    //锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
                // }
            });
            positionPicker.on('success', function(positionResult) {
                let locationMsg ={
                    lng: positionResult.position.lng,   // 经度
                    lat: positionResult.position.lat,   // 维度
                    address: positionResult.address,    // 详细地址
                    nearestJunction: positionResult.nearestJunction,  // 最近的路口
                    nearestRoad: positionResult.nearestRoad,          // 最近的路
                    nearestPOI: positionResult.nearestPOI             // 最近的POI
                }
                //将数据抛出
                tant.props.getLocationMsg(locationMsg)
            });
            positionPicker.on('fail', function(positionResult) {
                // 海上或海外无法获得地址信息
                alert('选址失败请稍后重试')
            });
            positionPicker.start();
        });
    }
    render() {
        return (
            <div id="GetLocation">
               <input id="pickerInput" placeholder="输入关键字选取地点" />
               <div id="container" className="map"></div>
            </div>
        );
    }
}

export default GetLocation;