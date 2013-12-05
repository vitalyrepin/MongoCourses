# Write a program in the language of your choice that will remove the grade of type "homework" with the lowest score for each student from the dataset that you imported in HW 2.1.
# Since each document is one grade, it should remove one document per student.

# Hint/spoiler: If you select homework grade-documents, sort by student and then by score, you can iterate through and find the lowest score for each student by noticing a change
# in student id. As you notice that change of student_id, remove the document.


import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

db=connection.students

try:
	cursor = db.grades.find({'type' : 'homework'}, {'score' : 1, 'student_id' : 1, '_id' : 0}).sort([('student_id', pymongo.ASCENDING), ('score', pymongo.ASCENDING)])

except:
	print "Unexpected error:", sys.exc_info()[0]

id = -1

for elem in cursor:
	if(id != elem['student_id']):
		id = elem['student_id']
		print 'To remove the elem printed'
#		db.grades.remove(elem)
	print elem

