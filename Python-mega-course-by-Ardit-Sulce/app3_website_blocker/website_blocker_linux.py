import time
from datetime import datetime as dt

hosts_path = r'/etc/hosts'  # r' means raw string, no spec character like \
hosts_temp = r'/home/Documents/hosts'
redirect = '127.0.0.1'
website_list = ['www.facebook.com', 'facebook.com', 'outlook.live.com/owa/']

while True:

    if dt(dt.now().year, dt.now().month, dt.now().day, 8, 0) < dt.now() < dt(dt.now().year, dt.now().month, dt.now().day, 17, 59):
        print('Working hours...')
        with open(hosts_temp, 'r+') as file:
            content = file.read()
            for website in website_list:
                if website in content:
                    pass
                else:
                    file.write(redirect + ' ' + website + "\n")

    else:
        print('Lazy time...')
        with open(hosts_temp, 'r+') as file:
            content = file.readlines()   # creates a list of the lines
            file.seek(0)  # cursor goes back to first position
            for line in content:
                if not any(website in line for website in website_list):
                    file.write(line)
            file.truncate()  # deletes everything after the cursor's current position, so text is not multiplying in each loop


    time.sleep(5)  # sleeps 5 seconds before continuing
