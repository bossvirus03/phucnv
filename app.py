from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

def is_prime(number):
    if number < 2:
        return False
    for i in range(2, number // 2 + 1):
        if number % i == 0:
            return False
    return True

def tu_sinh(min, max):
    prime = random.randint(min, max)
    while not is_prime(prime):
        prime = random.randint(min, max)
    return prime

def nghich_dao(a, m):
    m0, x0, x1 = m, 0, 1
    while a > 1:
        q = a // m
        m, a = a % m, m
        x0, x1 = x1 - q * x0, x0
    return x1 + m0 if x1 < 0 else x1

def ma_hoa(text, public_key):
    p, a, y = public_key
    k = random.randint(1, p - 1)
    K = pow(y, k, p)
    c1 = pow(a, k, p)
    c2 = (K * text) % p
    return (c1, c2)

def giai_ma(text, private_key):
    p, a, x = private_key
    c1, c2 = text
    k = pow(c1, x, p)
    k_inv = nghich_dao(k, p)
    plain_text = c2 * k_inv % p
    return plain_text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/keys', methods=['POST'])
def generate_keys():
    data = request.json
    p = int(data['p'])
    a = int(data['a'])
    x = int(data['x'])

    y = pow(a, x, p)
    public_key = (p, a, y)
    private_key = (p, a, x)

    return jsonify(public_key=public_key, private_key=private_key)

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    text = data['text']
    public_key = tuple(data['public_key'])
    text_encode = [ord(ch) for ch in text]
    encrypted_text = [ma_hoa(ch, public_key) for ch in text_encode]
    return jsonify(encrypted_text)

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.json
    encrypted_text = data['encrypted_text']
    private_key = tuple(data['private_key'])
    text_decode = [giai_ma(tuple(ch), private_key) for ch in encrypted_text]
    decrypted_text = "".join(chr(ch) for ch in text_decode)
    return jsonify(decrypted_text)

if __name__ == '__main__':
    app.run(debug=True)
