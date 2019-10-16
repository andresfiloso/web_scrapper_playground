from flask import Flask, render_template, redirect, session, url_for, request
from bs4 import BeautifulSoup
import requests
import json

app = Flask(__name__)

@app.route('/')
def default():
	return redirect(url_for('home'), code=307)

@app.route('/home')
def home():

    example = open("example1.html", "r").read()
    soup = BeautifulSoup(example, 'html5lib')

    html = soup.find("html")

    tags = html.findChildren()
    print("cantidad de tags")
    print(len(tags))
    
    content = []

    for tag in tags:
        item = {}
        item['type'] = tag.name
        item['content'] = str(tag)

    f = open("tags.json", "w")
    f.write(json.dumps(content))
    f.close()

    return render_template('index.html', **locals())


@app.route('/scrap', methods=['POST'])
def scrap():
    body = request.get_json()
    print(body)
    items = []

    example = open("example1.html", "r").read()
    response = requests.get(body['host'])
    soup = BeautifulSoup(response.text, 'html5lib')

    if body['prop']:
        if body['option'] == "find":
            items = str(soup.find(body['element'], {body['prop']: body['value']}))
        elif body['option'] == "find_all":
            items = soup.find_all(body['element'], {body['prop'], body['value']})
    else:
        if body['option'] == "find":
            items = str(soup.find(body['element']))
        elif body['option'] == "find_all":
            items = soup.find_all(body['element'])

    if isinstance(items, str):
        data = []
        data.append(items) 
    else:
        print('no es string')
        data = [str(item) for item in items]

    return json.dumps(data)

if __name__ == '__main__':
    app.run()