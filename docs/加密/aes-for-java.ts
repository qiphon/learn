/**
 * @file 配合 java 完成接口加密使用的工具记录
 */

import CryptoJS from 'crypto-js';
import forge from 'node-forge';

const keyStr = 'you secrete key';
const AESKey = CryptoJS.enc.Utf8.parse(keyStr);
const AESOptions = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
};
/**
 * @description 数据加密 aes
 * 接口数据加密后 key 统一为 requestData
 */
export const encrypt = (msg: string): string => {
    const srcs = CryptoJS.enc.Utf8.parse(msg);
    const result = CryptoJS.AES.encrypt(srcs, AESKey, AESOptions);
    const base64 = CryptoJS.enc.Base64;
    return result.ciphertext.toString(base64);
};

/**
 * @description 解密
 */
export const deCrypt = (msg: string): string => {
    const de = CryptoJS.AES.decrypt(msg, AESKey, AESOptions);

    return CryptoJS.enc.Utf8.stringify(de);
};
export const encryptGCM = (someBytes: string) => {
    const iv = forge.random.getBytesSync(12);
    const cipher = forge.cipher.createCipher('AES-GCM', keyStr);
    cipher.start({
        iv,
    });
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(someBytes)));
    cipher.finish();
    const encrypted = cipher.output;
    const { tag } = cipher.mode;
    return btoa(iv + encrypted.data + tag.data);
};

export const decryptGCM = (datas: string) => {
    const someBytes = atob(datas);
    const iv = someBytes.slice(0, 12);
    const tag = someBytes.slice(-16);
    const data = someBytes.slice(12, someBytes.length - 16);
    const decipher = forge.cipher.createDecipher('AES-GCM', keyStr);
    decipher.start({
        iv,
        tag,
    });
    decipher.update(forge.util.createBuffer(data));
    const pass = decipher.finish();
    if (pass) {
        return decipher.output.toString();
    }
    return '';
};
