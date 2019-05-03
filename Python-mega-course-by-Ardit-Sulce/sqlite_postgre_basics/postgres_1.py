import psycopg2

def create_table():
    conn = psycopg2.connect("dbname='database1' user='postgres' password='postgres123' host='localhost' port='5432'")  # createing connection object to the database
    cursor = conn.cursor()  # createing cursor object to interact with database
    cursor.execute("CREATE TABLE IF NOT EXISTS store (item TEXT, quantity INTEGER, price REAL)")
    conn.commit()
    conn.close()

def insert(item, quantity, price):
    conn = psycopg2.connect("dbname='database1' user='postgres' password='postgres123' host='localhost' port='5432'")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO store VALUES(%s,%s,%s)", (item, quantity, price) )
    conn.commit()
    conn.close()

def view():
    conn = psycopg2.connect("dbname='database1' user='postgres' password='postgres123' host='localhost' port='5432'")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM store")
    rows=cursor.fetchall()
    conn.close()
    return rows

def delete(item):
    conn = psycopg2.connect("dbname='database1' user='postgres' password='postgres123' host='localhost' port='5432'")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM store WHERE item=%s", (item,)) # need to have ',' after item
    conn.commit()
    conn.close()

def update(quantity, price, item):
    conn = psycopg2.connect("dbname='database1' user='postgres' password='postgres123' host='localhost' port='5432'")
    cursor = conn.cursor()
    cursor.execute("UPDATE store SET quantity=%s , price=%s WHERE item=%s", (quantity, price, item))
    conn.commit()
    conn.close()

#create_table()

#insert('Apple', 8, 10.6)
#insert('Orange', 10, 8)
#insert('Coffee Cup', 10, 5)

#delete('Orange')

#update(20, 6, 'Apple')

print(view())
