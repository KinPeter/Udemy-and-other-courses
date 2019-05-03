import cv2

img = cv2.imread('galaxy.jpg', 0)  # 0:BW, 1:color, -1 color with transparency

print(type(img))
print(img)
print(img.shape) # image size in pixels

resized_image = cv2.resize(img, (int(img.shape[1]/2) , int(img.shape[0]/2)))

cv2.imshow('Galaxy', resized_image)
cv2.waitKey(0)  # miliseconds // if 0, then it waits for a keypress
cv2.destroyAllWindows()

cv2.imwrite('galaxy_resized.jpg', resized_image)  # saves the new image to a new file
