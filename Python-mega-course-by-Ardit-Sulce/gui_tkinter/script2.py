from tkinter import *


def kgs_grams_pounds_ounces():
    t1.delete(1.0, END)
    t2.delete(1.0, END)
    t3.delete(1.0, END)
    t1.insert(END, float(e1_value.get()) * 1000)
    t2.insert(END, float(e1_value.get()) * 2.20462)
    t3.insert(END, float(e1_value.get()) * 35.274)

window = Tk()

# label 1
l1 = Label(window, text='Kg')
l1.grid(row=0, column=0)

# entry 1
e1_value = StringVar()
e1 = Entry(window, textvariable=e1_value, width=12)
e1.grid(row=0, column=1)

# button 1
b1 = Button(window, text='Convert', command=kgs_grams_pounds_ounces)
b1.grid(row=0, column=2)

# text 1 - grams
t1 = Text(window, height=1, width=15)
t1.grid(row=1, column=0)

# text 2 - pounds
t2 = Text(window, height=1, width=15)
t2.grid(row=1, column=1)

# text 3 - ounces
t3 = Text(window, height=1, width=15)
t3.grid(row=1, column=2)

window.mainloop()
