#!/usr/bin/python

# Write a program in the language of your choice that will remove the lowest homework score for each student. Since there is a single document for each student
# containing an array of scores, you will need to update the scores array and remove the homework.

# Hint/spoiler: With the new schema, this problem is a lot harder and that is sort of the point. One way is to find the lowest homework in code and then update
# the scores array with the low homework pruned. If you are struggling with the Python side of this, look at the remove operator, which can remove stuff from a Python list. 

import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

db=connection.school

try:
	cursor = db.students.find({})

except:
	print "Unexpected error:", sys.exc_info()[0]

for elem in cursor:
	## WARNING: I am not a Python guy :-) Looks ugly, I know it.
	# Form a list of homeworks elems from the "scores" lits
	hw = []
	for item in elem["scores"]:
		if(item["type"] == "homework"):
			hw.append(item)
	min_elm = hw[0]
	# Search for minimal element
	for item in hw:
		if(item["score"] < min_elm["score"]):
			min_elm = item
	# Remove minimal elem of type "homework" from the 'scores' list
	elem['scores'].remove(min_elm)
	try:
		db.students.update({"_id" : elem['_id']}, elem)
	except:
		print "Unexpected error:", sys.exc_info()[0]


