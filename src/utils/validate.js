/**
 * 常用验证方法封装
 * User: hjm100
 * Date: 18-10-09 10:10
 */



/**
 * 姓名验证
 */
export let isName = name=>{
    let regExp = /^[\u4e00-\u9fa5]{2,6}$/; //匹配2到6个中文字符
    if (regExp.test(name)) return true;
    else return false;
}

/**
 * 手机号验证
 */
export let isPhone = phone=>{
    let regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[45678]|19[89]|16[6])[0-9]{8}$/;
    if (regExp.test(phone)) return true;
    else return false;
}

/**
 * 密码验证
 */
export let isPassword = password=>{
    let regExp = /^[a-zA-Z0-9]{6,16}$/; //匹配6到16个数字与字母相结合
    if (regExp.test(password)) return true;
    else return false;
}

/**
 * 邮箱验证
 */
export let isEmail = email=>{
    let regExp = /^[a-zA-Z0-9]{6,16}$/; //匹配6到16个数字与字母相结合
    if (regExp.test(email)) return true;
    else return false;
}

/**
 * 精确匹配身份证号
 */
export let isIDCard = idcard => {
    idcard = idcard.toUpperCase(); // 对身份证号码做处理
    let ereg;
    let Y, JYM;
    let S, M;
    /*基本校验*/
    let idcard_array = [];
    idcard_array = idcard.split("");
    //出生日期的合法性检查
    //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
    //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
    if (parseInt(idcard.substr(6, 4),10) % 4 === 0 ||(parseInt(idcard.substr(6, 4),10) % 100 === 0 &&parseInt(idcard.substr(6, 4),10) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}[1-9][0-9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9XxAa]$/; //闰年出生日期的合法性正则表达式
    } else {
        ereg = /^[1-9][0-9]{5}[1-9][0-9][0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9XxAa]$/; //平年出生日期的合法性正则表达式
    }
    if (ereg.test(idcard)) {
        //测试出生日期的合法性
        //计算校验位
        S =
            (parseInt(idcard_array[0],10) + parseInt(idcard_array[10],10)) * 7 +
            (parseInt(idcard_array[1],10) + parseInt(idcard_array[11],10)) * 9 +
            (parseInt(idcard_array[2],10) + parseInt(idcard_array[12],10)) * 10 +
            (parseInt(idcard_array[3],10) + parseInt(idcard_array[13],10)) * 5 +
            (parseInt(idcard_array[4],10) + parseInt(idcard_array[14],10)) * 8 +
            (parseInt(idcard_array[5],10) + parseInt(idcard_array[15],10)) * 4 +
            (parseInt(idcard_array[6],10) + parseInt(idcard_array[16],10)) * 2 +
            parseInt(idcard_array[7],10) * 1 +
            parseInt(idcard_array[8],10) * 6 +
            parseInt(idcard_array[9],10) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1);
        /*判断校验位*/
        if (M === idcard_array[17]) {
            /*检测ID的校验位false;*/
            return true;
        } else if (idcard_array[17] === "A") {
            //A结尾不校验规则
            return true;
            /*检测ID的校验位false;*/
        } else {
            return false;
        }
    } else {
        return false;
    }
};