import bottle
import pymongo

from pymongo import MongoClient

# Handler for the default path of the web server

@bottle.route('/')

def index():

	# Connect to MongoDB
	conn = MongoClient('localhost', 27017)

	# test: database name
	db = conn.test

	# Collection name: names
	names = db.names

	# Find a single document
	item = names.find_one()

	return '<b>Hello %s!</b>' % item['name']


bottle.run(host='localhost', port=8082)
