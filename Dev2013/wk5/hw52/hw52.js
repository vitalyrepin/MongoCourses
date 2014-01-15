// Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000.

// For this problem, assume that a city name that appears in more than one state represents two separate cities.

// Please round the answer to a whole number.
// Hint: The answer for CT and NJ is 49749.

use zips

db.zips.aggregate([
    // Removing "loc", and zip code fields from the pipeline processing
    {$project:
      {
        _id: 0, pop : 1, state : 1, city: 1
      }
    },
    // Match - only CA and NY
    {$match :
   	{
	  $or : [{state: "CA"}, {state : "NY"}]
	}
    },
    // Grouping by (state, city) to calculate the city population
    {$group:
     { _id : {state: "$state", city: "$city"},
       pop:  {"$sum" : "$pop"}
     }
    },
    // Match : only the cities with population over 25000
    {$match:
	{
	  pop: {$gte : 25000}
	}
    },
    // Reshaping
    {$project:
	{
	  _id: 0,
	  state: "$_id.state",
	  city: "$_id.city",
	  pop: "$pop"
	}
    },
    // Calculating average population
    {$group:
	{
	  _id: null,
	  pop: {"$avg" : "$pop"}
	}
    }
])
