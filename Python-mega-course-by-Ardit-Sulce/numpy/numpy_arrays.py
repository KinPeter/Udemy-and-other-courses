import cv2, numpy


# reading image to variable, 0: grayscale, 1: color (bgr)
img_g = cv2.imread("smallgray.png", 0)   

print(img_g)
print(type(img_g), "\n")


# writing the array into a new image file
cv2.imwrite("new_smallgray2.png", img_g)


# slicing and indexing numpy arrays
print(
	img_g[0:2],  # get the first 2 rows
	"\n",
	img_g[0:2, 2:4],  # get the first 2 rows, and from them columns (index) 2 and 3 (4 excluded)
	"\n",
	img_g[1,1],  # get one item, 2nd row, 2nd column (indexes)
	"\n"
	)


# iterating through the array
# iterate by rows: 
for i in img_g:
    print(i)
print()

# iterate by columns (by transpose .T):
for i in img_g.T:
    print(i)
print()

# iterate by each item:
for i in img_g.flat:
    print(i)


# horizontal stacking - hstack, using a tuple as parameter
img_hs = numpy.hstack((img_g, img_g))  # saving to new variable, tuple could contain different arrays
print("\n",img_hs)

# vertical stacking - vstack, using a tuple as parameter
img_vs = numpy.vstack((img_g, img_g, img_g))  # saving to new variable, tuple could contain different arrays
print("\n",img_vs)

# spliting horizontally - by columns
# hsplit, the last parameter is divisor, the results must be same size (columns % number = 0)
h_split = numpy.hsplit(img_vs, 5)   # the result will be a python list of numpy arrays
print("\n",h_split)
print("\n",h_split[0])  # can reach each splitted array by indexing

# spliting vertically - by rows
# vsplit, the last parameter is divisor, the results must be same size (rows % number = 0)
v_split = numpy.vsplit(img_vs, 3)   # the result will be a python list of numpy arrays
print("\n",v_split)
print("\n",v_split[0])  # can reach each splitted array by indexing