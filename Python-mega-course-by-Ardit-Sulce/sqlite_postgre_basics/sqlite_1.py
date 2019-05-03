import sqlite3

def create_table():
    conn = sqlite3.connect('lite.db')  # createing connection object to the database
    cursor = conn.cursor()  # createing cursor object to interact with database
    cursor.execute("CREATE TABLE IF NOT EXISTS store (item TEXT, quantity INTEGER, price REAL)")
    conn.commit()
    conn.close()

def insert(item, quantity, price):
    conn = sqlite3.connect('lite.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO store VALUES (?, ?, ?)", (item, quantity, price))
    conn.commit()
    conn.close()

def view():
    conn = sqlite3.connect('lite.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM store")
    rows=cursor.fetchall()
    conn.close()
    return rows

def delete(item):
    conn = sqlite3.connect('lite.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM store WHERE item=?", (item,)) # need to have ',' after item
    conn.commit()
    conn.close()

def update(quantity, price, item):
    conn = sqlite3.connect('lite.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE store SET quantity=? , price=? WHERE item=?", (quantity, price, item))
    conn.commit()
    conn.close()

#create_table()

#insert('Wine Glass', 8, 10.6)
#insert('Water Glass', 10, 8)
#insert('Coffee Cup', 10, 5)

#delete('Wine Glass')

update(11, 6, 'Water Glass')

print(view())
