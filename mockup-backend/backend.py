from flask import Flask, jsonify, request
from flask.helpers import make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app, support_credentials=True)

all_vehicles = [
    {
        'id': 1,
        'vin': '1GYS3BEF3DR636934',
        'equipmentlevel': 'budget', 
        'mileage': 257128,
        'avgfuelconsumption': 6.30,
        'brand': 'Nissan',
        'model': 'Altima',
        'type': 'Coupe',
        'purpose': 'universal'
    },
    {
        'id': 2,
        'vin': '2XDDDDDDDDDDDDDDD',
        'equipmentlevel': 'standard', 
        'mileage': 284292,
        'avgfuelconsumption': 12.87,
        'brand': 'Land Rover',
        'model': 'LR3',
        'type': 'Convertible',
        'purpose': 'other'
    },
    {
        'id': 3,
        'vin': 'LOLOLOLOLOLOLOLOL',
        'equipmentlevel': 'premium', 
        'mileage': 18387,
        'avgfuelconsumption': 7.60,
        'brand': 'Chevrolet',
        'model': '2500',
        'type': 'Liftback',
        'purpose': 'waste disposal'
    }
]

employees = [
    {
        'id': 1,
        'firstname': 'Jerzy',
        'lastname': 'Kiler',
        'phonenumber': '123456789',
        'function': 'Driver'
    },
    {
        'id': 2,
        'firstname': 'Stefan',
        'lastname': 'Siarzewski',
        'phonenumber': '456789123',
        'function': 'Accountant'
    },
    {
        'id': 3,
        'firstname': 'Jerzy',
        'lastname': 'Ryba',
        'phonenumber': '132435465',
        'function': 'Bodyguard'
    },
    {
        'id': 4,
        'firstname': 'Ferdynand',
        'lastname': 'Lipski',
        'phonenumber': '111111111',
        'function': 'Cleaner'
    },
    {
        'id': 5,
        'firstname': 'Ryszarda',
        'lastname': 'Siarzewska',
        'phonenumber': '223344556',
        'function': 'Driver'
    },
    {
        'id': 6,
        'firstname': 'Jerzy',
        'lastname': 'Kiler',
        'phonenumber': '123456789',
        'function': 'Driver'
    },
    {
        'id': 7,
        'firstname': 'Stefan',
        'lastname': 'Siarzewski',
        'phonenumber': '456789123',
        'function': 'Accountant'
    },
    {
        'id': 8,
        'firstname': 'Jerzy',
        'lastname': 'Ryba',
        'phonenumber': '132435465',
        'function': 'Bodyguard'
    },
    {
        'id': 9,
        'firstname': 'Ferdynand',
        'lastname': 'Lipski',
        'phonenumber': '111111111',
        'function': 'Cleaner'
    },
    {
        'id': 10,
        'firstname': 'Ryszarda',
        'lastname': 'Siarzewska',
        'phonenumber': '223344556',
        'function': 'Driver'
    },
]

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.json['login'] == 'admin' and request.json['password'] == 'admin':
        resp = make_response("Bearer testadmintoken", 200)
        return resp
    elif request.json['login'] == 'user' and request.json['password'] == 'user':
        resp = make_response("Bearer testusertoken", 200)
        return resp
    else:
        resp = make_response("", 400)
        return resp


@app.route('/my-permissions', methods=['GET'])
@cross_origin()
def my_permissions():
    print(request.headers.get('authorization'))
    if request.headers.get('authorization') == 'Bearer testadmintoken':
        resp = make_response("{\"permissions\": \"admin\"}", 200)
        return resp
    elif request.headers.get('authorization') == 'Bearer testusertoken':
        resp = make_response("{\"permissions\": \"user\"}", 200)
        return resp
    else:
        resp = make_response("", 400)
        return resp


@app.route('/vehicles', methods=['GET'])
@cross_origin()
def get_all_vehicles():
    resp = make_response(jsonify(all_vehicles), 200)
    return resp

@app.route('/manage-employees', methods=['GET'])
@cross_origin()
def get_employees():
    resp = make_response(jsonify(employees), 200)
    return resp


if __name__ == '__main__':
    app.run(debug=True)
