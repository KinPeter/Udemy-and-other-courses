import cv2, time

first_frame = None
video = cv2.VideoCapture(0)  # creating video object from camera index 0 (default builtin cam)

while True:  # showing video requires infinite loop
    check, frame = video.read()  # this starts the webcam
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
        if cv2.contourArea(contour) < 1000:  # checking each contour area, so we ignore small differences
            continue
        (x, y, w, h) = cv2.boundingRect(contour)  # getting the x, y coords and width, height of the bounding rectangles
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 3)  # drawing green rectangles around each differences (movements)

    # displaying each type of image (video) in different windows
    cv2.imshow('Capturing', gray)
    cv2.imshow('Delta frame', delta_frame)
    cv2.imshow('Treshold', thresh_frame)
    cv2.imshow('Color frame', frame)

    key = cv2.waitKey(1)  # wait 1 milisecond between each loop
    if key == ord('q'):   # 'Q' key will break the loop and exit
        break

video.release()  # stops using the webcam
cv2.destroyAllWindows()
