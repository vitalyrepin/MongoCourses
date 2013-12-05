import pymongo

from pymongo import MongoClient

# Connect to database
conn = MongoClient('localhost', 27017)

# test: database name
db = conn.test

# Collection name: names
names = db.names

item = names.find_one()

print item['name']
