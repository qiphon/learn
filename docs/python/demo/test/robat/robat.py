#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''
Bing 壁纸爬虫
'''

import urllib
import urllib.request
import ssl
import time
import json
import os.path

class BingBgDownloader(object) :

    _bing_url = 'https://cn.bing.com'
    _bing_interface = '/HPImageArchive.aspx?format=js&idx=0&n=%d&nc=%d&pid=hp'
    _img_filename = '[%s%s][%s].%s'

    def __init__(self) :
        super(BingBgDownloader, self).__init__()
        ssl._create_default_https_context = ssl._create_unverified_context

    # 下载壁纸
    def download(self, num=1, local_path='./') :
        if num < 1:
            num = 1
        url = self._bing_url + self._bing_interface %(num, int(time.time()))
        img_info = self._get_img_info(url)

        for info in img_info:
            print(self._get_img_url(info), 'url---------')
            print(self._get_img_file_name(info), 'name------')
            self._down_img( self._bing_url + self._get_img_url(info), self._get_img_file_name(info))

    # 获取图片资源信息
    def _get_img_info(self, url):
        request = urllib.request.urlopen(url).read()
        bgObj = json.loads(bytes.decode(request))
        print(bgObj)
        return bgObj['images']

    # 从接口数据提取文件名
    def _get_img_file_name(self, img_info): 
        zh_name = ''
        pos = img_info['copyright'].index('(')
        if pos< 0:
            zh_name = img_info['copyright']
        else:
            zh_name = img_info['copyright'][0:pos]

        entmp = img_info['url']
        # 英文文件名
        en_name = entmp[entmp.rindex('/') + 1 : entmp.rindex('_ZH')]

        # 后缀
        ex_name = entmp[entmp.rindex('.') + 1: -1]
        ex_name = ex_name[0: (ex_name.index('&') or -1)]
        # 分辨率
        pix = entmp[entmp.rindex('_') + 1: entmp.rindex('.')]

        img_name = self._img_filename%(zh_name ,en_name, pix, ex_name)
        # print(img_name, 'img_name')
        return img_name

    # 从接口数据地址
    def _get_img_url(self, img_info): 
        return img_info['url']

    # 下载图片
    def _down_img (self, img_url, img_path):
        print(img_url, img_path, 'img down start....')
        img_data = urllib.request.urlopen(img_url).read()
        # print(img_data)
        # img_data = bytes.decode(img_data)
        f = open(img_path, 'wb')
        f.write(img_data)
        f.close()
        print('success saved img: ' , img_path)

if __name__ == '__main__':
    dl = BingBgDownloader()
    # print(dir(dl))
    dl.download(1)