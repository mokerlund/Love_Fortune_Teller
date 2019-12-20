import pandas as pd



import csv
import json
import sys


# # df = csv.reader(open("example_dataset_CSV.csv", 'rU'), quotechar='"', delimiter = ',')
# df = pd.read_csv("example_dataset_CSV.csv")
# # print(df)
# def create_entries(df):
#     entries = []
#     # Stopping case
#     if df.shape[1] == 2:  # only 2 columns left
#         for i in range(df.shape[0]):  # iterating on rows
#             entries.append(
#                 {"Name": df.iloc[i, 0],
#                  df.columns[-1]: df.iloc[i, 1]}
#             )
#     # Iterating case
#     else:
#         values = set(df.iloc[:, 0])  # Getting the set of unique values
#         for v in values:
#             entries.append(
#                 {"Name": v,
#                  # reiterating the process but without the first column
#                  # and only the rows with the current value
#                  "Children": create_entries(
#                      df.loc[df.iloc[:, 0] == v].iloc[:, 1:]
#                  )}
#             )
#     return entries
# mydict = {"Name": "All Respondents",
#           "Children": create_entries(df.iloc[:, 1:])}
# print(json.dumps(mydict, indent=4))

# with open('example_dataset_JSON_v2.json', 'w') as outfile:
#     json.dump(mydict, outfile)



# reader = csv.reader(open(sys.argv[1], 'r'))
# reader = csv.reader(open("example_dataset_CSV.csv", 'rU'), quotechar='"', delimiter = ',')
df = pd.read_csv("example_dataset_CSV.csv")
df1 = df.groupby(['L1', 'L2','L3'])['L4'].sum()
df1 = df1.reset_index()
# dataStructure = {}

# # reader = csv.reader(open(sys.argv[1], 'r'))
# reader = csv.reader(open("example_dataset_CSV.csv", 'rU'), quotechar='"', delimiter = ',')
# # reader.next() 
# next(reader)
for data in reader:
    current = dataStructure
    for item in data[:-2]:
        # if not current.has_key(item):
        if item not in current:
            current[item] = {}

        current = current[item]
    # if not current.has_key(data[-2]):
    if data[-2] not in current:
        current[data[-2]] = 1
    else:
        current[data[-2]] += 1
# # print('var data = ' + str(dataStructure))
# print(json.dumps(dataStructure, indent=4))

flare = dict()
flare = {"name":"flare", "children": []}
for line in df1.values:
    the_parent = line[0]
    the_child = line[1]
    child_2 = line[2]
    child_3 = line[3]
    

    # make a list of keys
    d = flare
    keys_list = []
    for item in d['children']:
        keys_list.append(item['name'])

    # if 'the_parent' is NOT a key in the flare.json yet, append it
    # x = 1
    # if not the_parent in keys_list:
    #     d['children'].append({"name":the_parent, "children":[{
    #         "name":the_child, "children":[{
    #         "name": child_2, "children":[{
    #             "name":child_3, "value":1}]
    #     }]
    #     }]
    #     })


    # if 'the_parent' IS a key in the flare.json, add a new child to it
    # elif the_parent in keys_list:
    #     if not the_child in keys_list:

    #         d['children'][keys_list.index(the_parent)]['children'].append({
    #             "name":the_child, "children":[{
    #             "name": child_2, "children":[{
    #             "name":child_3, "value":1}]

    #     elif the_child in keys_list:
    #         if not child_2 in keys_list:
    #             d['children'][keys_list.index(the_parent)]['children'].append({"name":the_child, "children":[{
    #     "name": child_2, "children":[{
    #         "name":child_3, "value":1}]


    #     d['children'].append({"name":the_parent, "children":[{
    #     "name":the_child, "children":[{
    #     "name": child_2, "children":[{
    #         "name":child_3, "value":1}]
    # }]
#     }]
#     })
# flare = d


# export the final result to a json file
# with open('output/path/flare.json', 'w') as outfile:
#     json.dump(flare, outfile)
print(json.dumps(flare, indent=4))


# with open('example_dataset_JSON.json', 'w') as outfile:
#     json.dump(dataStructure, outfile)
# mydict = {"Name": "All Respondents",
#           "Children": create_entries(df.iloc[:, 1:])}
# print(json.dumps(mydict, indent=4))

# with open('example_dataset_JSON_v2.json', 'w') as outfile:
#     json.dump(mydict, outfile)

# dataStructure = {}

# # reader = csv.reader(open(sys.argv[1], 'r'))
# reader = csv.reader(open("example_dataset_CSV.csv", 'rU'), quotechar='"', delimiter = ',')
# # reader.next() 
# next(reader)
# for data in reader:
#     current = dataStructure
#     for item in data[:-2]:
#         # if not current.has_key(item):
#         if item not in current:
#             current[item] = {}

#         current = current[item]
#     # if not current.has_key(data[-2]):
#     if data[-2] not in current:
#         current[data[-2]] = 1
#     else:
#         current[data[-2]] += 1
# # print('var data = ' + str(dataStructure))
# print(json.dumps(dataStructure, indent=4))


# with open('example_dataset_JSON.json', 'w') as outfile:
#     json.dump(dataStructure, outfile)




# def find_element(children_list,name):
#     """
#     Find element in children list
#     if exists or return none
#     """
#     for i in children_list:
#         if i["name"] == name:
#             return i
#     #If not found return None
#     return None

# def add_node(path,value,nest):
#     """
#     The path is a list.  Each element is a name that corresponds 
#     to a level in the final nested dictionary.  
#     """

#     #Get first name from path
#     this_name = path.pop(0)

#     #Does the element exist already?
#     element = find_element(nest["children"], this_name)

#     #If the element exists, we can use it, otherwise we need to create a new one
#     if element:

#         if len(path)>0:
#             add_node(path,value, element)

#     #Else it does not exist so create it and return its children
#     else:

#         if len(path) == 0:
#             nest["children"].append({"name": this_name, "value": value})
#         else:
#             #Add new element
#             nest["children"].append({"name": this_name, "children":[]})

#             #Get added element 
#             element = nest["children"][-1]

#             #Still elements of path left so recurse
#             add_node(path,value, element)

# df = pd.read_json(dataStructure)


# d = {"name": "root",
# "children": []}

# levels = ["same sex","married", "20-29"]
# for row in df.iterrows():
#     r = row[1]
#     path = list(r[levels])
#     value = r["val"]
#     add_node(path,value,d)

# print(json.dumps(d, sort_keys=False,
#               indent=2))



# import csv
# import json
# import sys

# dataStructure = {}

# # reader = csv.reader(open(sys.argv[1], 'r'))
# reader = csv.reader(open("example_dataset_CSV.csv", 'rU'), quotechar='"', delimiter = ',')
# # reader.next() 
# next(reader)
# for data in reader:
#     current = dataStructure
#     for item in data[:-2]:
#         # if not current.has_key(item):
#         if item not in current:
#             current[item] = {}

#         current = current[item]
#     # if not current.has_key(data[-2]):
#     if data[-2] not in current:
#         current[data[-2]] = 1
#     else:
#         current[data[-2]] += 1
# # print('var data = ' + str(dataStructure))
# print(json.dumps(dataStructure, indent=4))


# with open('example_dataset_JSON.json', 'w') as outfile:
#     json.dump(dataStructure, outfile)
