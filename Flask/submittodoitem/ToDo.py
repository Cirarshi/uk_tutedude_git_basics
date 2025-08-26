from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["todo_db"]
todos = db["todo_items"]

@app.route('/submittodoitem', methods=['POST'])
def submit_todo_item():
    data = request.get_json()
    item_name = data.get("itemName")
    item_description = data.get("itemDescription")

    if not item_name or not item_description:
        return jsonify({"error": "Missing fields"}), 400

    todos.insert_one({"itemName": item_name, "itemDescription": item_description})
    return jsonify({"message": "Item saved successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
