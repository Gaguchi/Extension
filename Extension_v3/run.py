from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
import random
from selenium.webdriver.common.keys import Keys
import os
import time
import undetected_chromedriver as uc
from selenium import webdriver
import json
import zipfile
import requests
import csv
from bs4 import BeautifulSoup

chrome_options = webdriver.ChromeOptions()
       
chrome_options.add_argument(rf"--user-data-dir={os.getcwd()}/user_dir")

chrome_options.add_argument(f"--load-extension={os.getcwd()}/extension -manifest-v2") 

driver = uc.Chrome(options=chrome_options)
driver.set_page_load_timeout(180)
driver.implicitly_wait(60)

driver.get("https://app.centraldispatch.com/")
#Transko
#Iraklius2021@
tt=input('enter to start')
while True:
    time.sleep(5)
    driver.switch_to.window(driver.window_handles[-1]) 
