/**
 * 时间补位
 */
export let add0 = m => {
    return m < 10 ? "0" + m : m;
};
  
/**
 * 时间戳转化
 */
export let timestamp_switch_time = timestamp => {
    let time;
    //时间戳只能有10位或者13位（js生成的时间戳为13位 php生成的是10位）
    if (String(timestamp).length === 13) time = new Date(parseInt(timestamp,10));
    else time = new Date(parseInt(timestamp,10) * 1000);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return (y +"-" +add0(m) +"-" +add0(d) +" " +add0(h) +":" +add0(mm) +":" +add0(s));
};
  