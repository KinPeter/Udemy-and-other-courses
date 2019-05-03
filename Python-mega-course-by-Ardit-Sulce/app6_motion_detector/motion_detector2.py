import cv2, time, pandas
from datetime import datetime

status_list = [None, None]
times_list = []
df = pandas.DataFrame(columns=['Start', 'End'])

first_frame = None
video = cv2.VideoCapture(0)  # creating video object from camera index 0 (default builtin cam)

while True:  # showing video requires infinite loop
    check, frame = video.read()  # this starts the webcam

    status = 0  # means there is no movement

    if first_frame is None:
        time.sleep(2)  # wait a little bit to let the camera start to avoid first frame being full black
        check, frame = video.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # creating grayscale frame
    gray = cv2.GaussianBlur(gray, (21,21), 0)  # applying gaussian blur on the frame

    if first_frame is None:
        first_frame = gray  # capturing and storing the first frame for later comparison
        # !!! FIRST FRAME SHOULD BE THE EMPTY BACKGROUND !!!
        continue

    delta_frame = cv2.absdiff(first_frame, gray)  # creating the difference (delta) between the first frame and the current gray frame

    thresh_frame = cv2.threshold(delta_frame, 30, 255, cv2.THRESH_BINARY)[1]  # converting difference into treshold, only black and white pixels
    thresh_frame = cv2.dilate(thresh_frame, None, iterations=2)  # dilating / smoothing the treshold image

    (_,cnts,_) = cv2.findContours(thresh_frame.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # finding the contours on the treshold image (copy)
    for contour in cnts:
        if cv2.contourArea(contour) < 10000:  # checking each contour area, so we ignore small differences
            continue

        status = 1  # when we find this bigger contour, there is movement, so status is changed

        (x, y, w, h) = cv2.boundingRect(contour)  # getting the x, y coords and width, height of the bounding rectangles
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 3)  # drawing green rectangles around each differences (movements)

    status_list.append(status)  # adding the current status to a list in every loop

    # we don't need all the items in the list, as we only want to know when it changes
    status_list = status_list[-2 : ]

    # we need to find those timespots when the status is changing from 0 to 1 and from 1 to 0
    if status_list[-1] == 1 and status_list[-2] == 0:   # inspecting the last 2 elements of the times_list
        times_list.append(datetime.now())   # adding the movement start time
    if status_list[-1] == 0 and status_list[-2] == 1:
        times_list.append(datetime.now())   # adding the movemnt stop time

    # displaying each type of image (video) in different windows
    #cv2.imshow('Capturing', gray)
    #cv2.imshow('Delta frame', delta_frame)
    cv2.imshow('Treshold', thresh_frame)
    cv2.imshow('Color frame', frame)

    key = cv2.waitKey(1)  # wait 1 milisecond between each loop
    if key == ord('q'):   # 'Q' key will break the loop and exit
        if status == 1:
            times_list.append(datetime.now()) # if we exit while there is movement, it will add a stoptime

        break

video.release()  # stops using the webcam
cv2.destroyAllWindows()

print(status_list)
print(times_list)

# adding each timespot from the times list to a pandas dataframe
for i in range(0, len(times_list), 2):
    df = df.append({'Start' : times_list[i], 'End' : times_list[i+1]}, ignore_index=True)

df.to_csv('times.csv')  # exporting it to a csv file
