# import dependencies
from flask import Flask, jsonify, render_template, redirect
from flask_pymongo import PyMongo
import requests

#################################################
# Flask Setup
#################################################

# Create an app
app = Flask(__name__)
app._static_folder = 'static'

#################################################
# Database Setup
#################################################
# # Create connection variable
# app.config["MONGO_URI"] = "mongodb://localhost:27017/oceans_db"
# # conn = "mongodb://localhost:27017/oceans_db"
# # Pass connection to the pymongo instance.
# # client = pymongo.MongoClient(conn)
# mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    print("Server received request for 'Home' page...")

    return render_template('index.html')

# 'key' route
@app.route("/key")
def key():
    print("Loading Key...")
    return render_template('key.html')

# 'analysis' direct route
@app.route("/direct")
def direct():
    print("Loading Fish...")
    return render_template('direct.html')

# 'analysis' debris route
@app.route("/debris")
def indirect():
    print("Loading Debris...")
    return render_template('debris.html')

# 'analysis' eutrophication route
@app.route("/eutrop")
def eutrop():
    print("Loading Eutrop...")
    return render_template('eutrophication.html')

# 'prediction process' route
@app.route("/predproc")
def predproc():
    print("Loading Prediction Process...")
    return render_template('predproc.html')

# 'sources' route
@app.route("/sources")
def sources():
    print("Loading Sources...")
    return render_template('sources.html')

# 'prediction' route
@app.route("/predict")
def predict():
    print("Loading Predictions...")
    return render_template('predict.html')

# 'vessel' route
@app.route("/vessel")
def vessel():
    return render_template('vessel.html')

# 'process' route
@app.route("/process")
def process():
    print("Loading Process...")
    return render_template('process.html')

# 'team' route
@app.route("/team")
def team():
    # teamnames = ['ennegineer', 'stephbanh', 'elliott-dev', 'tobisan4']
    url = "https://api.github.com/users/"
    teams = {'ennegineer':{}, 'stephbanh':{}, 'elliott-dev':{}, 'tobisan4':{}}
    for mem in teams:
        queryurl = url + mem
    # Get response into JSON
        response = requests.get(queryurl)
        teamjson = response.json()
        teams[mem] = teamjson

    return render_template('team.html', teams = teams)

if __name__ == "__main__":
    app.run()
