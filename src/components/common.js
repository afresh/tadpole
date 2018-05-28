/**
 * Created by 媲美爱 on 2018-05-25.
 */

import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

export let screenWidth = Dimensions.get('window').width;
export let screenHeight = Dimensions.get('window').height;
export let fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();

//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const width2x = 750 / DEFAULT_DENSITY;
//px转换成dp
const height2x = 1334 / DEFAULT_DENSITY;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function autoFontSize(size) {
    let scaleWidth = screenWidth / width2x;
    let scaleHeight = screenHeight / height2x;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function autoScaleSize(size) {
    let scaleWidth = screenWidth / width2x;
    let scaleHeight = screenHeight / height2x;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenHeight === X_HEIGHT && screenWidth === X_WIDTH) ||
        (screenHeight === X_WIDTH && screenWidth === X_HEIGHT))
    )
}

Date.prototype.format=function(fmt) {
    let o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 === 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    let weekday = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+weekday[this.getDay()+""]);
    }
    for(let k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

export default class Common {
    static SCREEN_WIDTH = screenWidth;
    static SCREEN_HEIGHT = screenHeight;
    static PIXEL_RATIO = pixelRatio;
    static DEFAULT_DENSITY = DEFAULT_DENSITY;

    //是否为iphoneX
    static isIphoneX = isIphoneX();

    //字体自适应大小
    static autoFontSize(size) {
        return autoFontSize(size);
    }

    //尺寸自适应大小
    static autoScaleSize(size) {
        return autoScaleSize(size);
    }

    //获取指定格式时间字符串
    static getDateFormat(date, format = false) {
        if (false !== format) {
            format = "yyyy-MM-dd HH:mm:ss";
        }
        return date.format(format);
    }
}