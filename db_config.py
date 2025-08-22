import mysql.connector

def get_db_connection():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Password@254",  # Replace if needed
        database="rental_system"
    )
    return db