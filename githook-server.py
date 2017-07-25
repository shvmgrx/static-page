from flask import Flask, request
import logging
import json
import sys

# Event logger
logger = logging.getLogger('Githooks logger')
logger.setLevel(logging.DEBUG)

event_file = logging.FileHandler('events.log')
event_file.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
event_file.setFormatter(formatter)
logger.addHandler(event_file)

# create flask instance
app = Flask(__name__)
app.config['DEBUG'] = True

success_request = {
    "Status": "Success"
}

@app.route('/', methods=['GET', 'POST'])
def intro():
    if request.method == 'POST':
        payload = request.data
        logger.info(payload)
        logger.info('Recieved a github event')
        return json.dumps(success_request)
    else:
        return 'Hello, world'

def run_shell_script():
    pass

if __name__ == '__main__':
    app.run()