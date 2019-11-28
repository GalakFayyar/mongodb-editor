import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['terraData']



collection = db['Rules']
collection.drop()
with open('data/rules.json') as f:
    file_data = json.load(f)

print("Import of all Rules...")
for doc in file_data['Rules']:
    # use collection_currency.insert(file_data) if pymongo version < 3.0
    collection.insert_one(doc)
print("Done.")



collection = db['ResponseProfiles']
collection.drop()
with open('data/responseProfiles.json') as f:
    file_data = json.load(f)

print("Import of Response Profiles...")
for doc in file_data['ResponseProfiles']:
    # use collection_currency.insert(file_data) if pymongo version < 3.0
    collection.insert_one(doc)
print("Done.")



collection = db['Converters']
collection.drop()
with open('data/converters.json') as f:
    file_data = json.load(f)

print("Import of Converters...")
for doc in file_data['Converters']:
    # use collection_currency.insert(file_data) if pymongo version < 3.0
    collection.insert_one(doc)
print("Done.")


client.close()