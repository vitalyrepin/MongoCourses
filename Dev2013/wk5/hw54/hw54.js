// Removing Rural Residents In this problem you will calculate the number of people who live in a zip code in the US where the city starts with a digit.
// We will take that to mean they don't really live in a city. Once again, you will be using the zip code collection you imported earlier. 


use zips

db.zips.aggregate([
    // Removing "loc", state and zip code fields from the pipeline processing
    // And adding the "first char" of the city name
    {$project:
      {
        _id: 0, pop : 1, first_char: {$substr : ["$city",0,1]}
      }
    },
    // Match: leave only the records where the first_char is a digit
    {$match:
      {
        first_char: {"$regex" : /^\d.*$/ }
      }
    },
    // Calculating total population in the rural areas
    {$group:
      {
        _id : null,
	total: { "$sum" : "$pop" }
      }
    }
])
