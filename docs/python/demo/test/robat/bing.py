#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
for python3 only
"""
import urllib
import urllib.request
import re
import time
import datetime
import os.path
import ssl

def save_img(img_url, img_name):
    # img_name = img_url[img_url.rindex('/')+1:]
    img_data = urllib.request.urlopen(img_url).read()
    f = open(img_name,'wb')
    f.write(img_data)
    f.close()
    print ('success saved image:',img_url)

# 下载今日前num天壁纸 
def bingwallpaper_index(num):
    ssl._create_default_https_context = ssl._create_unverified_context
    bingurl = 'http://cn.bing.com'
    tn = time.time()
    url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=%d&n=1&nc=%d&pid=hp'%(num,int(tn))
    print( url )
    response = bytes.decode(urllib.request.urlopen(url).read())
    try:
        img_url = re.findall(r'"url":"(.+?)"',response)[0]
        date = re.findall(r'"enddate":"(.+?)"',response)[0]
        desc = re.findall(r'"copyright":"(.+?)\(',response)[0]
        filename = img_url[img_url.rindex('/')+1:]
        img_name = date + '-' + desc + filename
        img_name = os.path.normcase(img_name)
        print(img_name)
        save_img(bingurl+img_url, img_name)
    except:
        print('%sfailed'%(date ))

if __name__ == '__main__':
    # 下载今日必应首页壁纸
    bingwallpaper_index(0)
    # 下载近7天必应首页壁纸
"""
    for i in range(8):
        bingwallpaper_index(i)
        time.sleep(1)
"""
