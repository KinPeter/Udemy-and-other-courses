import cv2, time

video = cv2.VideoCapture(0)

frm = 0

while True:
    frm += 1
    check, frame = video.read()

    print(check)
    print(frame)

    #time.sleep(3)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cv2.imshow('Capturing', gray)

    key = cv2.waitKey(1)

    if key == ord('q'):
        break

print(frm)
video.release()
cv2.destroyAllWindows()
