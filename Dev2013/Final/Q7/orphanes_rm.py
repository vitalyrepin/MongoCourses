#!/usr/bin/python

# Your task is to write a program to remove every image from the images collection that appears in no album.
# Or put another way, if an image does not appear in at least one album, it's an orphan and should be removed from the images collection.

import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

db=connection.q7

# Creating multi-key index on albums.images
db.albums.create_index("images")

try:
	cursor = db.images.find({}, {"_id" : 1})

except:
	print "Unexpected error:", sys.exc_info()[0]

# List of Orphan's ids. Not the very best idea in production by the way
orphanes_ids = []

for elem in cursor:
	# Going through all the images and checking is it inside any of the albums
	# If not - adding is to the "orphanes_ids" list
	try:
		album = db.albums.find_one({"images" : elem["_id"]}, {"_id" : 1})
		if(album is None):
			orphanes_ids.append(elem["_id"])
	except:
		print "Unexpected error:", sys.exc_info()[0]


print "Removing orphanes"
db.images.remove({"_id" : {"$in" : orphanes_ids}})
print "Done removing orphanes"
