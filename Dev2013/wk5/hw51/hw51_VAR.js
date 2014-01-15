// Use the aggregation framework to calculate the author with the greatest number of comments.
use blog

db.posts.aggregate([
    // Leaving only "Comments field"
    {$project:
     {
	 _id:0,
	 'comments': 1
     }
    },
    // unwind the comments
    {$unwind : "$comments"},
    // Group by Author
    {$group :
      {_id : "$comments.author",
       count: {$sum:1}
      }
    },
    // Sort by count
    {$sort : {count : -1}},
    // We are interested in the top element of the result - the author with maximal amount of comments
    {$limit : 1}
])
