import psycopg2
import json
import os
from dotenv import load_dotenv

load_dotenv()

try:
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PWD'),
        host=os.getenv('DB_HOST'),
        #port=os.getenv('DB_PORT')
    )

    # Create a cursor object
    cur = conn.cursor()
    print("Database connection successful")

    # Load JSON data from file
    with open('books.json', 'r') as file:
        data = json.load(file)

    # Iterate over JSON data and insert into the database
    for record in data:
        cur.execute(
            "INSERT INTO api_book (title, author, genre, publication_year, cover_url) VALUES (%s, %s, %s, %s, %s)",
            (record['title'], record['author'], record['genre'], record['publication_year'], record['cover_url'])
        )
    
    # Commit the transaction
    conn.commit()
    print("Data inserted to DB successfully.")

except (Exception, psycopg2.Error) as error:
    print("Error connecting to PostgreSQL or performing database operations:", error)

finally:
    # Close cursor and connection
    if 'cur' in locals():
        cur.close()
    if 'conn' in locals():
        conn.close()
        print("PostgreSQL connection is closed")
