from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='/', static_folder='dist')

@app.route('/<path:filename>.js')
def javascript_static(filename):
    return send_from_directory(app.root_path + '/dist/', filename + '.js', mimetype='application/javascript')

@app.route('/')
@app.route('/page/<path:filename>')
def root(**_):
    return send_from_directory(app.root_path + '/dist/', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
