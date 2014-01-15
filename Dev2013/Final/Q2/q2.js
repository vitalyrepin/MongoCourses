use enron;

// Please use the Enron dataset you imported for the previous problem. For this question you will use the aggregation framework to figure out pairs of people
// that tend to communicate a lot. To do this, you will need to unwind the To list for each message.

// This problem is a little tricky because a recipient may appear more than once in the To list for a message. You will need to fix that in a stage of the
// aggregation before doing your grouping and counting of (sender, recipient) pairs.

// Which pair of people have the greatest number of messages in the dataset?

db.messages.aggregate([
    // Leaving only "From" and "To" fields
    {$project:
      {
        From : "$headers.From", To: "$headers.To"
      }
    },
    // Removing dupes from the "To" list
    // Step 1: Unwinding the "To" field
    {$unwind: "$To" },
    // Step 2: Removing the dupes in the "To" field
    {$group:
      {
        _id: { _id: "$_id", from: "$From", to: "$To" }
      }
    },
    // Counting the pairs
    {$group:
      {
         _id: {From: "$_id.from", To: "$_id.to"},
	 cnt: {$sum: 1}
      }
    },
    {$sort: {cnt: -1}},
    {$limit: 1}])
