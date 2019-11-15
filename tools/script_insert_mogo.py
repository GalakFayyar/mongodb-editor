import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['terraData']
collection_currency = db['rules']

with open('data/rules.json') as f:
    file_data = json.load(f)

for doc in file_data['Rules']:
    # use collection_currency.insert(file_data) if pymongo version < 3.0
    collection_currency.insert_one(doc)

client.close()