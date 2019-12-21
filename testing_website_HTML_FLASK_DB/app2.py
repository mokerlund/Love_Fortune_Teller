import os

import pandas as pd
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from percent_dict import percentDict

app = Flask(__name__)
CORS(app)
#################################################
# Database Setup
#################################################CHANGE THIS TO CORRECT sqlite

## THIS WORKS
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/HCMST_all_wvs.db"

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
# Base.prepare(db.engine, reflect=True)
Base.prepare(db.engine, reflect=True)

#####Save references to each table

table = Base.classes.api_data_table

@app.route("/", strict_slashes=False)
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/results/couple_input", strict_slashes=False)
@app.route("/couple_input", strict_slashes=False)
def couple_input():
    """Return the homepage."""
    return render_template("couple_input.html")

# roundabout way to click through multiple websites:
# @app.route("/couple_input/background", strict_slashes=False)
# def couple_input():
#     """Return the homepage."""
#     return render_template("background.html")

@app.route("/couple_input/results", strict_slashes=False)
@app.route("/results", strict_slashes=False)
def results():
    """Return the homepage."""
    return render_template("results.html")


@app.route("/couple_input/background", strict_slashes=False)
@app.route("/background", strict_slashes=False)
def background():
    """Return the homepage."""
    return render_template("background.html")
    
@app.route("/data", strict_slashes=False)
def sample_metadata():
    """Return the MetaData for all sample."""

    # return jsonify(list(table.columns)[1:])

    sel = [
        table.caseid_new,
        table.qflag_w1,
        table.married_w1,
        table.children_in_hh,
        # table.age,
        # table.age_bin,
        table.edu_gap,
        table.edu_gap_bin,
        table.age_difference,
        table.age_gap_bin,
        table.same_sex_couple,
        table.met_online,
        table.how_long_relationship_w1,
        table.relationship_quality_w1,
        # table.how_met,
        table.parental_approval,
        table.met_at_work,
        table.met_at_school,
        table.met_at_church,
        table.met_travel,
        table.met_social,
        table.met_party,
        table.met_f_and_f,
        table.met_as_neighbors,
        table.met_public_space,
        table.met_offline_dating,
        table.met_other,
        table.how_met_unique,
        table.relationship_len,
        table.partner_deceased
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
        sample_data["qflag_w1"] = result[1]
        sample_data["married_w1"] = result[2]
        sample_data["children_in_hh"] = result[3]
        # sample_data["age"] = result[4]
        # sample_data["age_bin"] = result[5]
        sample_data["edu_gap"] = result[4]
        sample_data["edu_gap_bin"] = result[5]
        sample_data["age_difference"] = result[6]
        sample_data["age_difference_bin"] = result[7]
        sample_data["same_sex_couple"] = result[8]
        sample_data["met_online"] = result[9]
        sample_data["how_long_relationship_w1"] = result[10]
        sample_data["relationship_quality_w1"] = result[11]
        # sample_data["how_met"] = result[12]
        sample_data["parental_approval"] = result[12]
        # sample_data["met_at_work"] = result[13]
        # sample_data["met_at_school"] = result[14]
        # sample_data["met_at_church"] = result[15]
        # sample_data["met_travel"] = result[16]
        # sample_data["met_social"] = result[17]
        # sample_data["met_party"] = result[18]
        # sample_data["met_f_and_f"] = result[19]
        # sample_data["met_as_neighbor"] = result[20]
        # sample_data["met_public_space"] = result[21]
        # sample_data["met_offline_dating"] = result[22]
        # sample_data["met_other"] = result[23]
        sample_data["how_met_unique"] = result[24]
        sample_data["relationship_len"] = result[25]
        sample_data["partner_deceased"] = result[25]
        # sample_data[""]

        
# append each dictionary into the list
        full_data_list.append(sample_data.copy())
   
    print(full_data_list)
    return jsonify(full_data_list)  

# WAS trying to make a route that could filter based on column in table

@app.route("/percentDict")
def percent_dict():
# dictionary locatedin percent_dict.py file (make sure to keep it in the same folder as app.py!!!)
    
   
    print(percentDict)
    return jsonify(percentDict)    

if __name__ == '__main__':
    app.run()