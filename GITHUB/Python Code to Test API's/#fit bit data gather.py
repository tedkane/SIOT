#fit bit data gather
import requests
import json
import time
import oauth2 as oauth2
from pprint import pprint
import csv
import datetime
import time
import datetime
from fitbitsecrets import user_id,refresh_token,base_64
import gspread as gspread
from oauth2client.service_account import ServiceAccountCredentials 

#refresh token for authorisation grant flow access

fitbit_access_token = 

################
#implicit grant flow 2 weeks access
#fitbit_access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0JKUTMiLCJzdWIiOiI5UDhYWksiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNjM4MjkxNjUxLCJpYXQiOjE2Mzc3NjU2NjF9.stVyRhM4VLVX9MTVJ9mA949hzT9R3UGKCQD6UdLsM_c'

#make dicitonary for header
header = {'Authorization' : 'Bearer {}'.format(fitbit_access_token)}
webadress = "https://api.fitbit.com/1/user/-/activities/heart/date/today/today.json"
response = requests.get("https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/16:53/18:22.json", headers=header).json()

dataset = response['activities-heart-intraday']['dataset']
#response3 = response2['dataset']

print(dataset[0])
print(len(dataset))
print(dataset[0]['time'])
print(dataset[0]['value'])

no_points = len(dataset)-1
cells = []

Date = "2022-01-06"

#turn the dataset into a list attribute
#batch updater [[coluums]+1.. rows]
count = 0
while count <= no_points:
    curval = [Date + "T" + dataset[count]['time'], dataset[count]['time'],dataset[count]['value']]
    cells.append(curval)
    count +=1


print(cells)

#google sheets data upload

scope = ['https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"] 
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope) 
client = gspread.authorize(creds) 

spreadsheet = client.open("SIOT_DATA").worksheet("Heart rate recent")

#for each of the dictionary entries convert them into a list
#spreadsheet.update_cells(cell_list)

start_cell = 'A1'
spreadsheet.update(start_cell, cells)
