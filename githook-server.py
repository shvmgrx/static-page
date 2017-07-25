from flask import Flask, request
import logging
import json
import subprocess

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
        branch_name = payload.ref.split("/")[0]
        logger.info('Recieved a github event at branch %s'.format(branch_name))
        run_shell_script(branch_name)    
        return json.dumps(success_request)
    else:
        return 'Hello, world'

def run_shell_script(name='master'):
    """
    Evoke shell script
    :param name: Name of the branch     
    """
    if name == 'master':
        # run the master deploy script
        subprocess.Popen('bash deploy.sh')
    elif name == 'develop':
        # run the dev deploy script
        subprocess.Popen('bash deploy-dev.sh')

if __name__ == '__main__':
    app.run()