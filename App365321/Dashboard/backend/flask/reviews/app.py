from flask import Flask, request,jsonify,make_response
from review import reviews,wordcloud
from flask_cors import CORS
from flask import send_file
import os
from dotenv import load_dotenv
import jwt
import datetime
from functools import wraps
load_dotenv()


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


def token_required(f) :
  @wraps (f)
  def decorated(*args, **kwargs):
  
    token = request.authorization.token
    print('token')
    print(token)
    if not token:
      return jsonify({'message' : 'Token is missing!'}), 403
    try:
      print('hello')
      print(jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"]))
     
    except:
     return jsonify({'message': 'Token is invalid!'}), 403
    return f(*args, **kwargs)
  return decorated



@app.get("/reviews")
@token_required
def getReviews():
    
    param = request.args.to_dict()
    rew = reviews(param)
    # rew=reviews()
    return rew


@app.get("/wordcloud")
def getWordCloud():
  
    plot = wordcloud()
  
    # Save the figure in the static directory 
    plot.savefig(os.path.join('static', 'images', 'plot.png'))
  
    return send_file(os.path.join('static', 'images', 'plot.png'))



# @app.get('/login')
# def authorize():
# #    print(os.getenv('SECRET_KEY'))
# #    print(request.args.to_dict().get('username'))
#    print('hello here')
#    print(request.authorization.username)
#    print(request.authorization)
#    username = request.authorization.username
#    token = ''
#    if request.authorization.password == os.getenv('PASSWORD'):
#      token = jwt.encode({'user':username,
#                          'exp':datetime.datetime.utcnow()+datetime.timedelta(days=2)},
#                           app.config['SECRET_KEY'],algorithm="HS256")
#    return jsonify({'token': token})




@app.get('/test')
@token_required
def test():
  return 'token'

@app.get('/test2')
def lon():
  
   return jsonify({'token': "dddss"})