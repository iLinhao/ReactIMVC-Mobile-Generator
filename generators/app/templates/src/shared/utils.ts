import crypto from 'crypto';

/**
 * 获取数据类型
 * @param any 要检测类型的数据
 * @returns string data 的数据类型是什么
 */
export function getDataType(data: any) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

/**
 * 手机号正则
 */
export const mobileReg = /^\d{11}$/;

/**
 * 验证码正则
 */
export const codeReg = /^\d{6}$/;

/**
 *
 * @param dateStr 日期字符串 yyyymmdd
 * @returns {string} 日期字符串 yyyy-mm-dd
 */
export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  let year = dateStr.substr(0, 4);
  let month = dateStr.substr(4, 2);
  let day = dateStr.substr(6);
  return year + '-' + month + '-' + day;
};

export const formatDateToStr = (date: Date) => {
  /* eslint no-confusing-arrow: 0 */
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  // const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr}`;
};

export const formatDateToTimeStr = (date: Date) => {
  /* eslint no-confusing-arrow: 0 */
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${date.getHours()}:${date.getMinutes()}`;
  // const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr}`;
};
/**
  *  把传入的时间戳与当前时间比较,计算距离现在的时间
  *  unixtime 需要计算的时间戳
  * */
export const getDateTimeFormat = (unixtime: number) => {
  let currTime = new Date().getTime();
  let time = (currTime - unixtime)/1000 ;
    const fullDateTime = formatDateToTimeStr(new Date(unixtime));
    time = Math.abs(time);
    // 少于一分钟
    if (time < 60) {
      return "刚刚";
    }
    // 少于1小时
    const minuies = time / 60;
    if (minuies < 60) {
      return Math.floor(minuies) + "分钟前";
    }

    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const yesterday = today - 24 * 3600 * 1000;
    const hours = time / 3600;

    // 今天0点后发的
    if(unixtime > today) {
      return Math.floor(hours) + "小时前";
    }

    // 昨天0点后发的
    if(unixtime > yesterday) {
      return "昨天" + fullDateTime.split(' ')[1];
    }

    // 今年
    if(new Date(unixtime).getFullYear() === new Date().getFullYear()) {
      return fullDateTime.substr(5);
    }

    // 更早
    return fullDateTime
};

/**
 * 校验手机号
 * @param phone 
 * @returns 
 */
export const checkMobile = (phone: string) => {
  if(!phone || phone.length !== 11 || !(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
    return false; 
  }
  return true 
}

/**
 * 校验验证码
 * @param code 
 * @returns 
 */
export const checkCode = (code: string) => {
  if(!code || !(/^[0-9]*$/.test(code))){ 
    return false; 
  }
  return true 
}

/**
 * AES 加密
 * @param key 加密公钥
 * @param iv 初始化向量
 * @param data 需要加密的数据
 */
 export function aesEncrypt(key: string, iv: string, data: string) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

/**
 * AES 解密
 * @param key 加密公钥
 * @param iv 初始化向量
 * @param data 需要解密的数据
 */
 export function aesDecrypt(key: string, iv: string, data: string) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * RSA 加密
 * @param key 加密的公钥
 * @param data 需要加密的数据
 */
export function rsaEncrypt (key: string, data: string) {
  return crypto.publicEncrypt({ key, padding: 4 }, Buffer.from(data)).toString('base64');
}

/**
 * HmacSHA256 加密
 * @param 需要加密的数据 
 * @returns 
 */
export function hmacSHA256 (key: string, data: string) {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(data);
  return hmac.digest('hex');
}

/**
 * 从a-z,A-Z,0-9 共 62 个字符中随机选取多个字符
 * @param length 选取的字符个数
 * @returns 随机选取的字符串 
 */
export function getRandomStr (length: number) {
  const chars = 'qwertyuioplkjhgfdsazxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * 对 uri 参数，按 key 进行正序排序
 * @param obj
 * @return 
 */
export function formatUrlParams(params?: object) {
  if (!params) {
    return '';
  }
  const array = [];
  const keys = Object.keys(params).sort();
  for (let val of keys) {
    const _val = params[val];
    if (getDataType(_val) === 'array') {
      for (let k of _val) {
        array.push(`${val}=${k}`);
      }
    } else {
      array.push(`${val}=${_val}`);
    }
  }
  return array.join('&');
}

/**
 * Base64 编码
 * @param data
 * @returns 编码后的数据 
 */
export function base64Encode(data: string) {
  return Buffer.from(data, 'utf-8').toString('base64');
}

/**
 * Base64 解码
 * @param data
 * @returns 解码后的数据 
 */
 export function base64Decode(data: string) {
  return Buffer.from(data, 'base64').toString('utf-8');
}

/**
 * @returns string 操作系统 OS
 */
 export function getOsType(){
  const ua = window.navigator.userAgent.toLowerCase();
  let val;
  if (/Windows/i.test(ua)) {
    val = 'Win';
  } else if(/mac os/i.test(ua)) {
    val = 'IOS';
  } else {
    val = 'Android';
  }
  return val;
}

/**
 * 判断是否是微信浏览器
 * @returns 是否是微信浏览器
 */
export function isWechatClient(): boolean {
  return !!navigator.userAgent.match(/MicroMessenger/i);
}