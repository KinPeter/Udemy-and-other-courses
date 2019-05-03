from tkinter import *


def kms_to_miles():
    text1.insert(END, float(entry1_value.get()) * 1.6 )

    # kms = float(entry1_value.get())
    # miles = kms * 1.6
    # text1.insert(END, miles)  # puts the value of the var. to the end of text1 widget

# createing the main window object
window = Tk()

button1 = Button(window, text='Execute', command=kms_to_miles)
button1.grid(row=0, column=0)

entry1_value = StringVar()  # a special variable needed to get data from Entry()
entry1 = Entry(window, textvariable=entry1_value)
entry1.grid(row=0, column=1)

text1 = Text(window, height=1, width=20)
text1.grid(row=0, column=2)


window.mainloop()
