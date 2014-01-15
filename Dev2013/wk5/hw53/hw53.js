// There are documents for each student (student_id) across a variety of classes (class_id). Note that not all students in the same class have the same exact number of assessments. Some students have three homework assignments, etc.

// Your task is to calculate the class with the best average student performance. This involves calculating an average for each student in each class of all non-quiz assessments and then averaging those numbers to get a class average. To be clear, each student's average includes only exams and homework grades. Don't include their quiz scores in the calculation.

// What is the class_id which has the highest average student perfomance?

// Hint/Strategy: You need to group twice to solve this problem. You must figure out the GPA that each student has achieved in a class and then average those numbers to get a class average. After that, you just need to sort. The hardest class is class_id=2. Those students achieved a class average of 37.6

use school

db.grades.aggregate([
    // Removing _id field from the pipeline processing
    {$project:
      {
        _id: 0, student_id: 1, class_id: 1, scores: 1
      }
    },
    // Unwinding scores array
    {$unwind : "$scores"},
    // Match: removing all the quizzez
    {$match:
    	{
	  "scores.type" : {$ne : "quiz"}
	}
    },
    // Grouping by (class, student) to calculate average score for every students
    {$group:
       {
         _id: { class_id: "$class_id", student_id: "$student_id"},
	 score: { "$avg" : "$scores.score"}
       }
    },
    // Grouping by class to calculate average score for the class
    {$group:
       {
         _id: "$_id.class_id",
	 avg_score: { "$avg" : "$score"}
       }
    },
    // Sorting by avg_score
    {$sort:
       { avg_score : -1}
    },
    // Showing the highest class
    {$limit : 1}
])
