// Question: consider the state with the 4th most zip codes in it.
// How many zip codes does that state have? Use the aggregation framework to query this.

use zips

db.zips.aggregate([
    // Removing "loc", pop and city name fields from the pipeline processing
    {$project:
      {
        state : 1
      }
    },
    // Grouping by (state) to calculate the number of records belonging to the same state
    {$group:
     { _id : {state: "$state"},
       num:  {"$sum" : 1}
     }
    },
    // Sorting by num
    {$sort:
     { num : -1 }
    },
    // Skipping three elements
    {$skip : 3},
    // Showing 4th state
    {$limit : 1}
 ])
