from flask import Flask, jsonify, request
from flask.helpers import make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app, support_credentials=True, resources={r"/.*": {"origins": "http://localhost:3000"}})

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


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.json['login'] == 'admin' and request.json['password'] == 'admin':
        resp = make_response(jsonify({"data": {"AUTH_TOKEN": "Bearer testadmintoken"}}), 200)
        # resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    elif request.json['login'] == 'user' and request.json['password'] == 'user':
        resp = make_response(jsonify({"data": {"AUTH_TOKEN": "Bearer testusertoken"}}), 200)
        # resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    else:
        resp = make_response(jsonify({"data": {}}), 400)
        # resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp


@app.route('/my-permissions', methods=['GET'])
@cross_origin()
def my_permissions():
    if request.headers['Authentication'] == 'Bearer testadmintoken':
        resp = make_response(jsonify({"data": {"permissions": "admin"}}), 200)
        # resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    else:
        resp = make_response(jsonify({"data": {"permissions": "user"}}), 200)
        # resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp


@app.route('/all-vehicles', methods=['GET'])
@cross_origin()
def get_all_vehicles():
    resp = make_response(jsonify({"data": {"vehicles": all_vehicles}}), 200)
    # resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


if __name__ == '__main__':
    app.run(debug=True)
