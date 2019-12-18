import os

import pandas as pd
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################CHANGE THIS TO CORRECT sqlite

## THIS WORKS
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/HCMST_all_wvs_fake.db"

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
# Base.prepare(db.engine, reflect=True)
Base.prepare(db.engine, reflect=True)

#####Save references to each table

table = Base.classes.api_data_table

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/data")
def sample_metadata():
    """Return the MetaData for all sample."""

    # return jsonify(list(table.columns)[1:])

    sel = [
        table.caseid_new,
        table.qflag,
        table.married,
        table.children_in_hh,
        table.age,
        table.age_bin,
        table.age_difference,
        table.age_difference_bin,
        table.same_sex_couple,
        table.met_online,
        table.how_long_relationship,
        table.relationship_quality,
        table.how_met
    ]
    # results = db.session.query(table.age).all()
    results = db.session.query(*sel).all()
#   ##IF we choose to filter## examples below
#     # results = db.session.query(*sel).filter(Samples_Metadata.age_gap == age_gap).all()
#     # results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information

    sample_data = {}
    # Create a list that each dictionary will be put into
    full_data_list = []
    for result in results:
    
        sample_data["caseid_new"] = result[0]
        sample_data["qflag"] = result[1]
        sample_data["married"] = result[2]
        sample_data["children_in_hh"] = result[3]
        sample_data["age"] = result[4]
        sample_data["age_bin"] = result[5]
        sample_data["age_difference"] = result[6]
        sample_data["age_difference_bin"] = result[7]
        sample_data["same_sex_couple"] = result[8]
        sample_data["met_online"] = result[9]
        sample_data["how_long_relationship"] = result[10]
        sample_data["relationship_quality"] = result[11]
        sample_data["how_met"] = result[12]
        
# append each dictionary into the list
        full_data_list.append(sample_data.copy())
   
    print(full_data_list)
    return jsonify(full_data_list)  

    # print(sample_data)
    # return jsonify(sample_data)
    # print(results)
    # return jsonify(results)    

if __name__ == '__main__':
    app.run()