import glob2
from datetime import datetime

filenames = glob2.glob("file*.txt")

with open(datetime.now().strftime('%Y-%m-%d %H-%M') + '.txt', 'w') as myfile:
	for filename in filenames:
		with open(filename, 'r') as textfile:
			myfile.write(textfile.read() + '\n')

			
