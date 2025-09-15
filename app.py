from flask import Flask, render_template, redirect, url_for, request, session, jsonify
import mysql.connector
from db_config import get_db_connection
import threading
import tkinter
import os

app = Flask(__name__)
app.secret_key = 'SuperSecret@254'

# Connect to MySQL
db = get_db_connection()
cursor = db.cursor(buffered=True)

# Import the tkinter login function from your module
def launch_tkinter_app():
    os.system(r'python "C:\\Users\\Hp\\Paragon-rental-system\\Management.py"')

@app.route('/Rental System')
def main():
    return render_template("Main.html")

@app.route('/Rental System/About')
def about():
    return render_template("About.html")

@app.route('/Rental System/Home')
def home():
    return render_template("home.html")

@app.route('/Rental System/TenantLogin', methods=["GET", "POST"])
def Tenant():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        cursor.execute("SELECT * FROM tenants WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()
        if user:
            session['username'] = username
            return redirect(url_for('Dashboard'))
        else:
            return "❌ Invalid username or password"
    return render_template("Tenants.html")

@app.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    password = request.form["password"]
    with db.cursor() as cursor:
        cursor.execute("INSERT INTO tenants (username, password) VALUES (%s, %s)", (username, password))
    db.commit()
    return "✅ Registration successful! <a href='/Rental System/TenantLogin'>Login</a>"

@app.route('/Rental System/Dashboard')
def Dashboard():
    if 'username' in session:
        username = session['username']

        cursor1 = db.cursor()
        cursor1.execute("SELECT * FROM tenant_details WHERE username=%s", (username,))
        profile = cursor1.fetchone()

        cursor2 = db.cursor()
        cursor2.execute("SELECT message FROM complaints WHERE username=%s", (username,))
        complaints = cursor2.fetchall()

        cursor3 = db.cursor()
        cursor3.execute("SELECT message FROM feedback WHERE username=%s", (username,))
        feedbacks = cursor3.fetchall()

        cursor4 = db.cursor()
        cursor4.execute("SELECT bill_number, service_month, rent_amount, water_units, deposit_amount, total, payment_date FROM bills WHERE username=%s", (username,))
        bills = cursor4.fetchall()

        cursor5 = db.cursor()
        cursor5.execute("SELECT username, amount, phone, status, transaction_id FROM payments WHERE username=%s", (username,))
        payments = cursor5.fetchall()

        return render_template("tdashboard.html", profile=profile, complaints=complaints, feedbacks=feedbacks, bills=bills, payments=payments)
    else:
        return redirect(url_for("Tenant"))



@app.route('/register-details', methods=['POST'])
def register_details():
    if 'username' in session:
        username = session['username']
        tenant_id = request.form['id']
        name = request.form['name']
        email = request.form['email']
        disability = request.form['disability']
        phone = request.form['phone']
        house = request.form['house']
        rooms = request.form['rooms']
        emergency = request.form['emergency']

        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO tenant_details (username, tenant_id, name, email, disability, phone, house, rooms, emergency)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (username, tenant_id, name, email, disability, phone, house, rooms, emergency))
        db.commit()
        cursor.close()
    return redirect(url_for('Dashboard'))

@app.route('/submit-complaint', methods=['POST'])
def submit_complaint():
    if 'username' in session:
        complaint = request.form['complaint']
        username = session['username']
        with db.cursor() as cursor:
            cursor.execute("INSERT INTO complaints (username, message) VALUES (%s, %s)", (username, complaint))
        db.commit()
    return redirect(url_for('Dashboard'))

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    if 'username' in session:
        feedback = request.form['feedback']
        username = session['username']
        cursor = db.cursor()
        cursor.execute("INSERT INTO feedback (username, message) VALUES (%s, %s)", (username, feedback))
        db.commit()
        cursor.close()
    return redirect(url_for('Dashboard'))

@app.route("/initiate-payment", methods=["POST"])
def initiate_payment():
    data = request.json
    amount = data.get("amount")
    phone = data.get("phone")
    username = data.get("username")

    try:
        stk_data = {
            "amount": amount,
            "phone": phone,
            "username": username
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": "secret_key"
        }
        res = requests.post("https://api.rotsi.co.ke/payments/stkPush/v1", json=stk_data, headers=headers)
        response_data = res.json()

        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Password@254",
            database="rental_system"
        )
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO payments (username, amount, phone, status, transaction_id)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            username,
            amount,
            phone,
            response_data.get("status"),
            response_data.get("RotsiAPITransactionId")
        ))
        db.commit()
        db.close()

        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/management')
def management():
    threading.Thread(target=launch_tkinter_app).start()
    return "Rental Management GUI has been launched (check your desktop)."

@app.route('/update-details', methods=['POST'])
def update_details():
    if 'username' not in session:
        return redirect('/login')

    username = session['username']
    id_number = request.form['id']
    name = request.form['name']
    email = request.form['email']
    disability = request.form['disability']
    phone = request.form['phone']
    house = request.form['house']
    rooms = request.form['rooms']
    emergency = request.form['emergency']

    try:
        cursor = db.cursor()
        cursor.execute('''
            UPDATE tenant_details
            SET name = %s,
                email = %s,
                disability = %s,
                phone = %s,
                house = %s,
                rooms = %s,
                emergency = %s
            WHERE tenant_id = %s AND username = %s
        ''', (name, email, disability, phone, house, rooms, emergency, id_number, username))

        db.commit()
        cursor.close()
        return redirect('/Rental System/Dashboard')

    except Exception as e:
        return f"Error updating details: {str(e)}"

@app.route('/delete-registration', methods=['POST'])
def delete_registration():
    if 'username' not in session:
        return redirect('/login')

    username = session['username']
    cursor = db.cursor()
    cursor.execute("DELETE FROM tenant_details WHERE username = %s", (username,))
    db.commit()
    cursor.close()

    return redirect('/Rental System/Dashboard')

if __name__ == '__main__':
    app.run(debug=True)
