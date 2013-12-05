
import json
import urllib2
import pymongo

# connect to mongo
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the reddit database
db=connection.reddit
stories = db.stories

hdr = { 'User-Agent' : 'super happy bot by vitrepin' }
req = urllib2.Request("http://www.reddit.com/r/technology/.json", headers=hdr)

# get the reddit home page
reddit_page = urllib2.urlopen(req)

# parse the json into python objects
parsed = json.loads(reddit_page.read())

# iterate through every news item on the page
for item in parsed['data']['children']:
    # put it in mongo
    stories.insert(item['data'])




