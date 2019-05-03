import cv2, glob

images = glob.glob('*.jpg')
print(images)

for image in images:
    img = cv2.imread(image, 1)
    res = cv2.resize(img, (int(img.shape[1]/2) , int(img.shape[0]/2)))
    cv2.imshow(image, res)
    cv2.waitKey(1000)
    cv2.destroyAllWindows()
    cv2.imwrite('resized_'+image, res)
