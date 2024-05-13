import csv

import sqlite3

# Open the CSV file
with open('provinces.csv', mode='r') as file:
    # Create a CSV reader
    csv_reader = csv.reader(file)
    
    # Skip the header if needed
    next(csv_reader)
    
    # Process each row
    for row in csv_reader:
        print(row)  # Each row is a list of strings

        