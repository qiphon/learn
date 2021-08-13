# 1. chrome 打开debug 端口
# Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# PYTHON Example
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
# chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
chrome_options.debugger_address = "127.0.0.1:92222"
# chromedriver 下载后放入bin目录
driver = webdriver.Chrome("chromedriver", chrome_options=chrome_options)

driver.get("https://www.baidu.com")
print(driver.title)