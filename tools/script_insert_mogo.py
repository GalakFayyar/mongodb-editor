import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['terraData']



collection = db['rules']
collection.drop()
with open('data/rules.json') as f:
    file_data = json.load(f)

print("Import of all rules...")
for doc in file_data['Rules']:
    # use collection_currency.insert(file_data) if pymongo version < 3.0
    collection.insert_one(doc)
print("Done.")



collection = db['responseProfiles']
collection.drop()
with open('data/responseProfiles.json') as f:
    file_data = json.load(f)

print("Import of Response Profiles...")
for doc in file_data['responseProfiles']:
    # use collection_currency.insert(file_data) if pymongo version < 3.0
    collection.insert_one(doc)
print("Done.")



client.close()