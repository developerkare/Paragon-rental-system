import tkinter
from tkinter import*
from tkinter import ttk, Frame
from tkinter import messagebox, Label
import random,os,tempfile,smtplib
import mysql.connector


root=Tk()
root.title('Login')
root.geometry('925x500+300+200')
root.iconbitmap(r"C:\Users\Hp\Paragon-rental-system\icon.ico")
root.configure(bg='grey')
root.resizable(False,False)

img = PhotoImage(file=r"C:\Users\Hp\Paragon-rental-system\Login.png")
Label(root, image=img, bg='white').place(x=50, y=50)
def  signin():
    username=user.get()
    password=code.get()

    if username=='The Company' and password=='1234':
        messagebox.showinfo("Welcome", "Rental Management System")
        #functionality codes
        def invoice():
            window1 = Tk()
            window1.title('Invoice Generator Form')
            window1.configure(bg='gray20')
            window1.resizable(0, 0)

            def clear_item():
                qty_spinbox.delete(0, tkinter.END)
                qty_spinbox.insert(0, "1")
                desc_entry.delete(0, tkinter.END)
                price_entry.delete(0, tkinter.END)
                price_entry.insert(0, "00")

            def add_item():
                qty=int(qty_spinbox.get())
                desc= desc_entry.get()
                price= int(price_entry.get())
                line_total=qty*price
                invoice_item=[qty, desc, price, line_total]

                tree.insert('', 0, values= invoice_item)
                clear_item()

            def new_invoice():
                first_name_entry.delete(0, tkinter.END)
                last_name_entry.delete(0, tkinter.END)
                house_number_entry.delete(0, tkinter.END)
                clear_item()
                tree.delete(*tree.get_children())

            def generate_invoice():
             Frame = tkinter.Frame(window1, bd=8, relief=GROOVE, bg='grey')
            frame.pack(padx=20, pady=10)

            first_name_label= tkinter.Label(frame, text="First Name", font=('times new roman', 15, 'bold'), bg='grey', fg='white')
            first_name_label.grid(row=0, column=0)

            first_name_entry= tkinter.Entry(frame, font=('arial', 15), bd=7, width=18)
            first_name_entry.grid(row=1, column=0, pady=9, padx=10)

            last_name_label = tkinter.Label(frame, text="Last Name", font=('times new roman', 15, 'bold'), bg='grey', fg='white')
            last_name_label.grid(row=0, column=1)

            last_name_entry = tkinter.Entry(frame,font=('arial', 15), bd=7, width=18)
            last_name_entry.grid(row=1, column=1, pady=9, padx=10)

            house_number_label = tkinter.Label(frame, text="House Number", font=('times new roman', 15, 'bold'), bg='grey', fg='white')
            house_number_label.grid(row=0, column=2)

            house_number_entry = tkinter.Entry(frame, font=('arial', 15), bd=7, width=18)
            house_number_entry.grid(row=1, column=2, pady=9, padx=10)

            qty_label = tkinter.Label(frame, text="Quantity", font=('times new roman', 15, 'bold'), bg='grey', fg='white')
            qty_label.grid(row=2, column=0)

            qty_spinbox = tkinter.Spinbox(frame, from_=1, to=100, font=('arial', 15), bd=7, width=18)
            qty_spinbox.grid(row=3, column=0, pady=9, padx=10)

            desc_label = tkinter.Label(frame, text="Description", font=('times new roman', 15, 'bold'), bg='grey', fg='white')
            desc_label.grid(row=2, column=1)

            desc_entry = tkinter.Entry(frame, font=('arial', 15), bd=7, width=18)
            desc_entry.grid(row=3, column=1, pady=9, padx=10)

            price_label = tkinter.Label(frame, text="Price", font=('times new roman', 15, 'bold'), bg='grey', fg='white')
            price_label.grid(row=2, column=2)

            price_entry = tkinter.Entry(frame, font=('arial', 15), bd=7, width=18)
            price_entry.grid(row=3, column=2, pady=9, padx=10)

            add_item_button= tkinter.Button(frame, text="Add Item", font=('arial', 16, 'bold'), bg='grey', fg='white', bd=5, command=add_item)
            add_item_button.grid(row=4, column=2, pady=5)

            column=('qty', 'desc', 'price', 'total')
            tree=ttk.Treeview(frame, columns=column, show="headings")
            tree.heading('qty', text='Quantity')
            tree.heading('desc', text='Description')
            tree.heading('price', text='Unit Price')
            tree.heading('total', text='Total')
            tree.grid(row=5, column=0, columnspan=3, padx=20, pady=10)

            save_invoice_button= tkinter.Button(frame, text="Generate Invoice", font=('arial', 16, 'bold'), bg='grey', fg='white', bd=5,
                             width=8, pady=10)
            save_invoice_button.grid(row=6, column=0, columnspan=3, sticky='news', padx=20, pady=5)

            new_invoice_button = tkinter.Button(frame, text="New Invoice", font=('arial', 16, 'bold'), bg='grey', fg='white', bd=5,
                             width=8, pady=10, command=new_invoice)
            new_invoice_button.grid(row=7, column=0, columnspan=3, sticky="news", padx=20, pady=5)

            window1.mainloop()

        def get_all_usernames():
            db = mysql.connector.connect(
                host="localhost",
                user="root",
                password="Password@254",
                database="rental_system"
                )
            cursor = db.cursor()
            cursor.execute("SELECT username FROM tenants")
            users = [row[0] for row in cursor.fetchall()]
            db.close()
            return users

        def test_dummy_bill():
            # Clear any existing values first
            tenantnameEntry.delete(0, END)
            houseEntry.delete(0, END)
            idEntry.delete(0, END)
            phoneentry.delete(0, END)
            roomEntry.delete(0, END)
            rentEntry.delete(0, END)
            unitEntry.delete(0, END)
            dopEntry.delete(0, END)
            depositEntry.delete(0, END)
            doeEntry.delete(0, END)
            dolEntry.delete(0, END)
            nameentry.delete(0, END)

            # Insert dummy data
            tenantnameEntry.insert(0, "John Doe")
            houseEntry.insert(0, "B12")
            idEntry.insert(0, "12345678")
            phoneentry.insert(0, "0712345678")
            roomEntry.insert(0, "2")
            rentEntry.insert(0, "15000")
            unitEntry.insert(0, "5")
            dopEntry.insert(0, "2025-07-18")
            depositEntry.insert(0, "10000")
            doeEntry.insert(0, "2025-07-01")
            dolEntry.insert(0, "2025-12-01")
            nameentry.insert(0, "Admin")
            monthentry.insert(0, "July")

            # Trigger total calculation
            total()

            # Save the bill
            save_bill()

        def autofill_user(username):
            if not username:
                return
            db = mysql.connector.connect(
                host="localhost",
                user="root",
                password="Password@254",
                database="rental_system"
                )
            cursor = db.cursor()
            cursor.execute("SELECT tenant_id, name, phone, house, rooms FROM tenant_details WHERE username=%s", (username,))
            data = cursor.fetchone()
            db.close()
            
            if data:
                tenant_id, full_name, phone, house, rooms = data
                tenantnameEntry.delete(0, END)
                tenantnameEntry.insert(0, full_name)

                contactEntry.delete(0, END)
                contactEntry.insert(0, phone)

                housenoEntry.delete(0, END)
                housenoEntry.insert(0, house)

                roomsEntry.delete(0, END)
                roomsEntry.insert(0, rooms)

                tenantEntry.delete(0, END)
                tenantEntry.insert(0, full_name)

                houseEntry.delete(0, END)
                houseEntry.insert(0, house)

                idEntry.delete(0, END)
                idEntry.insert(0, tenant_id)

                idnoEntry.delete(0, END)
                idnoEntry.insert(0, tenant_id)

                noEntry.delete(0, END)
                noEntry.insert(0, phone)

                roomEntry.delete(0, END)
                roomEntry.insert(0, rooms)

        def clear():
            housenoEntry.delete(0, END)
            tenantEntry.delete(0, END)
            idEntry.delete(0, END)
            contactEntry.delete(0, END)
            roomsEntry.delete(0, END)
            rentEntry.delete(0, END)
            unitEntry.delete(0, END)
            dopEntry.delete(0, END)

            housenoEntry.insert(0, 0)
            tenantEntry.insert(0, 0)
            idEntry.insert(0,0)
            contactEntry.insert(0, 0)
            roomsEntry.insert(0, 0)
            rentEntry.insert(0, 0)
            unitEntry.insert(0, 0)
            dopEntry.insert(0, 0)

            houseEntry.delete(0, END)
            tenantEntry.delete(0, END)
            idnoEntry.delete(0, END)
            noEntry.delete(0, END)
            roomEntry.delete(0, END)
            depositEntry.delete(0, END)
            doeEntry.delete(0, END)
            dolEntry.delete(0, END )

            houseEntry.insert(0, 0)
            tenantEntry.insert(0, 0)
            idnoEntry.insert(0, 0)
            noEntry.insert(0, 0)
            roomEntry.insert(0, 0)
            depositEntry.insert(0, 0)
            doeEntry.insert(0, 0)
            dolEntry.insert(0, 0)

            totalpaymentEntry.delete(0, END)
            depositamountEntry.delete(0, END)

            nameentry.delete(0,END)
            phoneentry.delete(0, END)
            monthentry.delete(0, END)

            textarea.delete(1.0, END)

        def send_email():
            def send_gmail():
                try:
                    ob=smtplib.SMTP('smtp.gmail.com',587)
                    ob.starttls()
                    ob.login(senderEntry.get(),passwordEntry.get())
                    message=email_textarea.get(1.0,END)
                    ob.sendmail(senderEntry.get(),receiverEntry.get(),message)
                    ob.quit()
                    messagebox.showinfo('Success','Receipt is successfully sent',parent=root1)
                    root1.destroy()
                except:
                    messagebox.showerror('Error', 'Something went wrong, Please try again',parent=root1)

            if textarea.get(1.0,END)=='\n':
                messagebox.showerror('Error','Bill is empty')
            else:
                root1=Toplevel()
                root1.title('Send Email')
                root1.configure(bg='grey')
                root1.resizable(0,0)

                senderFrame=LabelFrame(root1, text='SENDER', font=('arial',16,'bold'), bd=6, bg='grey', fg='white')
                senderFrame.grid(row=0,column=0, padx=40, pady=20)

                senderLabel=Label(senderFrame, text="Sender's Email", font=('arial',14,'bold'))
                senderLabel.grid(row=0,column=0, padx=10, pady=8)

                senderEntry=Entry(senderFrame, font=('arial', 14, 'bold'), bd=2, width=23, relief=RIDGE)
                senderEntry.grid(row=0, column=1, padx=10, pady=8)

                passwordLabel = Label(senderFrame, text="Password", font=('arial', 14, 'bold'))
                passwordLabel.grid(row=1, column=0, padx=10, pady=8)

                passwordEntry = Entry(senderFrame, font=('arial', 14, 'bold'), bd=2, width=23, relief=RIDGE,show='*')
                passwordEntry.grid(row=1, column=1, padx=10, pady=8)

                recepientFrame = LabelFrame(root1, text='RECIPIENT', font=('arial', 16, 'bold'), bd=6, bg='grey', fg='white')
                recepientFrame.grid(row=1, column=0, padx=40, pady=20)

                receiverLabel = Label(recepientFrame, text="Email Address", font=('arial', 14, 'bold'))
                receiverLabel.grid(row=0, column=0, padx=10, pady=8)

                receiverEntry = Entry(recepientFrame, font=('arial', 16, 'bold'), bd=6, width=23, relief=RIDGE)
                receiverEntry.grid(row=0, column=1, padx=10, pady=8)

                messageLabel = Label(recepientFrame, text="RECEIPT", font=('arial', 14, 'bold'))
                messageLabel.grid(row=1, column=0, padx=10, pady=8)

                email_textarea=Text(recepientFrame, font=('arial', 14,'bold'), bd=2, relief=SUNKEN,
                                    width=42, height=11)
                email_textarea.grid(row=2,column=0,columnspan=2)
                email_textarea.delete(1.0,END)
                email_textarea.insert(END,textarea.get(1.0,END).replace('*',''))

                sendButton=Button(root1,text='SEND', font=('arial',16,'bold'),width=15,command=send_gmail)
                sendButton.grid(row=2,column=0,pady=20)

                root1.mainloop()

        def print_bill():
            if textarea.get(1.0,END)=='\n':
                messagebox.showerror('Error','Bill is empty',parent=window)
            else:
                file=tempfile.mktemp('.txt')
                open(file,'w').write(textarea.get(1.0,END))
                os.startfile(file,'print')
        
        def save_bill(billnumber, username):
            bill_content = textarea.get(1.0, END).strip()
            if not bill_content:
                messagebox.showerror("Error", "Bill area is empty")
                return
            
            confirm = messagebox.askyesno("Confirm", "Do you want to save the bill?")
            if confirm:
                try:
                    bill_number = int(billnumber)
                    served_by = nameentry.get()
                    service_month = monthentry.get()
                    tenant_name = tenantnameEntry.get()
                    house_number = housenoEntry.get()
                    id_number = idnoEntry.get()
                    contact = contactEntry.get()
                    rooms = int(roomsEntry.get())
                    rent_amount = float(rentEntry.get())
                    water_units = int(unitEntry.get())
                    deposit_amount = float(depositEntry.get())
                    payment_date_raw = dopEntry.get().strip()
                    payment_date = payment_date_raw if payment_date_raw and payment_date_raw != '0' else None
                    entry_date_raw = doeEntry.get().strip()
                    entry_date = entry_date_raw if entry_date_raw and entry_date_raw != '0' else None
                    leave_date_raw = dolEntry.get().strip()
                    leave_date = leave_date_raw if leave_date_raw and leave_date_raw != '0' else None
                    total_amount = float(totalbill)
                    
                    # Save to MySQL
                    import mysql.connector
                    db = mysql.connector.connect(
                        host="localhost",
                        user="root",
                        password="Password@254",
                        database="rental_system"
                        )
                    cursor = db.cursor()
                    sql = """
                    INSERT INTO bills (
                    bill_number, served_by, service_month, tenant_name, house_number,
                    id_number, contact, rooms, rent_amount, water_units,
                    deposit_amount, payment_date, entry_date, leave_date, total, username
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """
                    values = (
                        bill_number, served_by, service_month, tenant_name, house_number,
                        id_number, contact, rooms, rent_amount, water_units,
                        deposit_amount, payment_date, entry_date, leave_date, total_amount,
                        username
                        )
                    cursor.execute(sql, values)
                    db.commit()
                    db.close()
                    
                    messagebox.showinfo("Success", "✅ Bill saved to database successfully!")
                    
                except Exception as e:
                    messagebox.showerror("Database Error", f"❌ Error: {str(e)}")


        # def save_bill():
        #     global billnumber
        #     billnumber = random.randint(1, 10000)
        #     result=messagebox.askyesno('Confirm', 'Do you want to save the bill?',parent=window)
        #     if result:
        #         bill_content=textarea.get(1.0, END)
        #         file=open(f'bills/ {billnumber}.txt','w')
        #         file.write(bill_content)
        #         file.close()
        #         messagebox.showinfo('Success',f'Bill Number{billnumber} is saved successfully',parent=window)


        # billnumber=random.randint(1,10000)

        def total():
            #rent payment calcution
            global rentprice, unitsprice
            global depositprice
            global totalbill

            rentprice=int(rentEntry.get())*1
            unitsprice=int(unitEntry.get())*150

            totalpaymentprice=rentprice+unitsprice
            totalpaymentEntry.delete(0, END)
            totalpaymentEntry.insert(0,totalpaymentprice)

            #vacant deposit payment calculation
            depositprice=depositEntry.get()*1

            totaldepositprice=depositprice
            depositamountEntry.delete(0, END)
            depositamountEntry.insert(0, totaldepositprice)

            totalbill=totalpaymentprice

        def bill_area():
            if nameentry.get()=='' or phoneentry.get()=='':
                messagebox.showerror('Error', 'Servicer Details Are Required',parent=window)
            elif totalpaymentEntry.get()=='' and depositamountEntry.get()=='':
                messagebox.showerror('Error', 'No Transactions are made',parent=window)
            elif totalpaymentEntry.get()=='0' and depositamountEntry.get()=='0':
                messagebox.showerror('Error', 'No Transactions are made',parent=window)
            else:
                from datetime import datetime
                billnumber = random.randint(1, 10000)
                textarea.delete(1.0, END)
                textarea.insert(END,'\t\t\t**Hello Tenant**\n')
                textarea.insert(END, f'\nBill Number:{billnumber}\n')
                textarea.insert(END, f'\nServed By:{nameentry.get()}\n')
                textarea.insert(END, f'\nService month:{monthentry.get()}\n')
                textarea.insert(END, '\n****************************************************************\n')
                textarea.insert(END, '\t\t\tTransaction Payment\n')
                textarea.insert(END, '\n****************************************************************\n')
                if housenoEntry.get()!='0':
                   textarea.insert(END,f'\nHouse Number:{housenoEntry.get()}\n')

                if tenantnameEntry.get()!='0':
                   textarea.insert(END,f'\nTenant Name:{tenantnameEntry.get()}\n')

                if idEntry.get()!='0':
                   textarea.insert(END,f'\nID Number:{idEntry.get()}\n')

                if contactEntry.get()!='0':
                   textarea.insert(END,f'\nContact:{contactEntry.get()}\n')

                if roomsEntry.get()!='0':
                   textarea.insert(END,f'\nNo of rooms:{roomsEntry.get()}\n')

                if rentEntry.get()!='0':
                   textarea.insert(END,f'\nRent Amount:{rentEntry.get()}\n')

                if unitEntry.get()!='0':
                   textarea.insert(END,f'\nWater units:{unitEntry.get()}\n')

                if dopEntry.get()!='0':
                   textarea.insert(END,f'\nPayment Date:{dopEntry.get()}\n')

                if houseEntry.get()!='0':
                   textarea.insert(END,f'\nHouse Number:{houseEntry.get()}\n')

                if tenantEntry.get()!='0':
                   textarea.insert(END,f'\nTenant Name:{tenantEntry.get()}\n')

                if idnoEntry.get()!='0':
                   textarea.insert(END,f'\nID Number:{idnoEntry.get()}\n')

                if noEntry.get()!='0':
                   textarea.insert(END,f'\nContact:{noEntry.get()}\n')

                if roomEntry.get()!='0':
                   textarea.insert(END,f'\nNo of Rooms:{roomEntry.get()}\n')

                if depositEntry.get()!='0':
                   textarea.insert(END,f'\nDeposit Amount:{depositEntry.get()}\n')

                if doeEntry.get()!='0':
                   textarea.insert(END,f'\nEntry Date:{doeEntry.get()}\n')

                if dolEntry.get()!='0':
                   textarea.insert(END,f'\nLeave Date:{dolEntry.get()}\n')

                textarea.insert(END,f'\n\nTotal Bill\t\t\t{totalbill}')

                textarea.insert(END, '\n****************************************************************\n')

                textarea.insert(END, '\t**Let our services bring you home.**\n')

                save_bill(billnumber, username_entry.get())

        #GUI part
        window=Toplevel(root)
        window.title("Rental Management System")
        window.geometry('1270x800')
        window.iconbitmap(os.path.join(os.path.dirname(__file__), 'icon.ico'))
        window.config(bg="white")
        window.resizable(False, False)


        headinglabel=Label(window, text='Rental Management System', font=('times new roman',30, 'bold'),
                           bg='grey', fg='gold', bd=12, relief=GROOVE)
        headinglabel.pack(fill=X, pady=10)

        services_frame= LabelFrame(window, text='Served By', font=('times new roman',15, 'bold'),
                                   fg='gold', bd=8, relief=GROOVE, bg='grey')
        services_frame.pack(fill=X)

        namelabel=Label(services_frame, text='Name', font=('times new roman',15, 'bold'), bg='grey', fg='white')
        namelabel.grid(row=0, column=0, padx=20, pady=2)

        nameentry=Entry(services_frame, font=('arial', 15), bd=7, width=18, )
        nameentry.grid(row=0, column=1, padx=8)

        phonelabel = Label(services_frame, text='Contact', font=('times new roman', 15, 'bold'), bg='grey', fg='white')
        phonelabel.grid(row=0, column=2, padx=20, pady=2)

        phoneentry = Entry(services_frame, font=('arial', 15), bd=7, width=18, )
        phoneentry.grid(row=0, column=3, padx=8)

        monthlabel = Label(services_frame, text='Month', font=('times new roman', 15, 'bold'), bg='grey', fg='white')
        monthlabel.grid(row=0, column=4, padx=20, pady=2)

        monthentry = Entry(services_frame, font=('arial', 15), bd=7, width=18)
        monthentry.grid(row=0, column=5, padx=8)

        productsFrame=Frame(window)
        productsFrame.pack(pady=10)

        paymentFrame= LabelFrame(productsFrame, text='Payment', font=('times new roman',15, 'bold'),
                                   fg='gold', bd=8, relief=GROOVE, bg='grey')
        paymentFrame.grid(row=0, column=0)

        user_label = Label(services_frame, text='Username', font=('times new roman', 15, 'bold'), bg='grey', fg='white')
        user_label.grid(row=1, column=0, padx=20, pady=5)

        username_entry = ttk.Combobox(services_frame, font=('arial', 15), width=18)
        username_entry['values'] = get_all_usernames()
        username_entry.grid(row=1, column=1, padx=8)
        username_entry.set('')
        username_entry.bind("<<ComboboxSelected>>", lambda e: autofill_user(username_entry.get()))

        housenoLabel= Label(paymentFrame, text='House No', font=('times new roman', 15, 'bold'), bg='grey', fg='white')
        housenoLabel.grid(row=0, column=0, pady=9, padx=10, sticky=W)

        housenoEntry= Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5 )
        housenoEntry.grid(row=0, column=1, pady=9, padx=10)
        housenoEntry.insert(0,0)

        tenanatnameLabel = Label(paymentFrame, text='Tenant name', font=('times new roman', 15, 'bold'), bg='grey', fg='white')
        tenanatnameLabel.grid(row=1, column=0, pady=9, padx=10, sticky='w')

        tenantnameEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        tenantnameEntry.grid(row=1, column=1, pady=9, padx=10)
        tenantnameEntry.insert(0,0)

        idLabel = Label(paymentFrame, text='Id Number', font=('times new roman', 15, 'bold'), bg='grey',
                             fg='white')
        idLabel.grid(row=2, column=0, pady=9, padx=10, sticky='w')

        idEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        idEntry.grid(row=2, column=1, pady=9, padx=10)
        idEntry.insert(0,0)

        contactLabel = Label(paymentFrame, text='Contact', font=('times new roman', 15, 'bold'), bg='grey',
                             fg='white')
        contactLabel.grid(row=3, column=0, pady=9, padx=10, sticky='w')

        contactEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        contactEntry.grid(row=3, column=1, pady=9, padx=10)
        contactEntry.insert(0,0)

        roomsLabel = Label(paymentFrame, text='No of Rooms', font=('times new roman', 15, 'bold'), bg='grey',
                             fg='white')
        roomsLabel.grid(row=4, column=0, pady=9, padx=10, sticky='w')

        roomsEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        roomsEntry.grid(row=4, column=1, pady=9, padx=10)
        roomsEntry.insert(0,0)

        rentLabel = Label(paymentFrame, text='Rent amount', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        rentLabel.grid(row=5, column=0, pady=9, padx=10, sticky='w')

        rentEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        rentEntry.grid(row=5, column=1, pady=9, padx=10)
        rentEntry.insert(0,0)

        unitLabel = Label(paymentFrame, text='Water units', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        unitLabel.grid(row=6, column=0, pady=9, padx=10, sticky='w')

        unitEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        unitEntry.grid(row=6, column=1, pady=9, padx=10)
        unitEntry.insert(0,0)

        dopLabel = Label(paymentFrame, text='Payment date', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        dopLabel.grid(row=7, column=0, pady=9, padx=10, sticky='w')

        dopEntry = Entry(paymentFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        dopEntry.grid(row=7, column=1, pady=9, padx=10)
        dopEntry.insert(0,0)

        vacantFrame = LabelFrame(productsFrame, text='Vacant', font=('times new roman', 15, 'bold'),
                                  fg='gold', bd=8, relief=GROOVE, bg='grey')
        vacantFrame.grid(row=0, column=1)

        houseLabel =Label(vacantFrame, text='House No', font=('times new roman', 15, 'bold'), bg='grey',
                         fg='white')
        houseLabel.grid(row=0, column=0, pady=9, padx=10, sticky='w')

        houseEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        houseEntry.grid(row=0, column=1, pady=9, padx=10)
        houseEntry.insert(0,0)

        tenanatLabel = Label(vacantFrame, text='Tenant Name', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        tenanatLabel.grid(row=1, column=0, pady=9, padx=10, sticky='w')

        tenantEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        tenantEntry.grid(row=1, column=1, pady=9, padx=10)
        tenantEntry.insert(0,0)

        idnoLabel = Label(vacantFrame, text='Id No', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        idnoLabel.grid(row=2, column=0, pady=9, padx=10, sticky='w')

        idnoEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        idnoEntry.grid(row=2, column=1, pady=9, padx=10)
        idnoEntry.insert(0,0)

        noLabel = Label(vacantFrame, text='Contact', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        noLabel.grid(row=3, column=0, pady=9, padx=10, sticky='w')

        noEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        noEntry.grid(row=3, column=1, pady=9, padx=10)
        noEntry.insert(0,0)

        roomLabel = Label(vacantFrame, text='No of Rooms', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        roomLabel.grid(row=4, column=0, pady=9, padx=10, sticky='w')

        roomEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        roomEntry.grid(row=4, column=1, pady=9, padx=10)
        roomEntry.insert(0,0)

        depositLabel = Label(vacantFrame, text='Deposit amount', font=('times new roman', 15, 'bold'), bg='grey',
                           fg='white')
        depositLabel.grid(row=5, column=0, pady=9, padx=10, sticky='w')

        depositEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        depositEntry.grid(row=5, column=1, pady=9, padx=10)
        depositEntry.insert(0,0)

        doeLabel = Label(vacantFrame, text='Entry date', font=('times new roman', 15, 'bold'), bg='grey',
                             fg='white')
        doeLabel.grid(row=6, column=0, pady=9, padx=10, sticky='w')

        doeEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        doeEntry.grid(row=6, column=1, pady=9, padx=10)
        doeEntry.insert(0,0)

        dolLabel = Label(vacantFrame, text='Leave date', font=('times new roman', 15, 'bold'), bg='grey',
                         fg='white')
        dolLabel.grid(row=7, column=0, pady=9, padx=10, sticky='w')

        dolEntry = Entry(vacantFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        dolEntry.grid(row=7, column=1, pady=9, padx=10)
        dolEntry.insert(0,0)

        billframe= Frame(productsFrame, bd=8, relief=GROOVE)
        billframe.grid(row=0, column=3, padx=10)

        billareaLabel=Label(billframe, text='Bill Area', font=('times new roman', 15, 'bold'), bd=7, relief=GROOVE)
        billareaLabel.pack(fill=X)

        scrollbar= Scrollbar(billframe, orient=VERTICAL)
        scrollbar.pack(side=RIGHT, fill=Y)

        textarea=Text(billframe,height=25, width=64,  yscrollcommand=scrollbar.set)
        textarea.pack()
        scrollbar.config(command=textarea.yview)

        billmenuFrame = LabelFrame(window, text='Bill Menu', font=('times new roman', 15, 'bold'),
                                  fg='gold', bd=8, relief=GROOVE, bg='grey')
        billmenuFrame.pack(fill=X)

        totapaymentLabel = Label(billmenuFrame, text='Total amount', font=('times new roman', 15, 'bold'), bg='grey',
                         fg='white')
        totapaymentLabel.grid(row=0, column=0, pady=9, padx=10, sticky='w')

        totalpaymentEntry= Entry(billmenuFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        totalpaymentEntry.grid(row=0, column=1, pady=9, padx=10)

        depositamountLabel = Label(billmenuFrame, text='Deposit Amount', font=('times new roman', 15, 'bold'), bg='grey',
                         fg='white')
        depositamountLabel.grid(row=1, column=0, pady=9, padx=10, sticky='w')

        depositamountEntry = Entry(billmenuFrame, font=('times new roman', 15, 'bold'), width=15, bd=5)
        depositamountEntry.grid(row=1, column=1, pady=9, padx=10)

        buttonFrame=Frame(billmenuFrame, bd=8, relief=GROOVE)
        buttonFrame.grid(row=0, column=2, rowspan=3)

        totalButton=Button(buttonFrame, text='TOTAL', font=('arial',16,'bold'), bg='gray20', fg='white', bd=5, width=8, pady=10, command=total)
        totalButton.grid(row=0, column=0, pady=20, padx=10)

        billButton = Button(buttonFrame, text='BILL', font=('arial', 16, 'bold'), bg='gray20', fg='white', bd=5,
                             width=8, pady=10, command=bill_area)
        billButton.grid(row=0, column=1, pady=20, padx=10)

        emailButton = Button(buttonFrame, text='EMAIL', font=('arial', 16, 'bold'), bg='gray20', fg='white', bd=5,
                            width=8, pady=10,command=send_email)
        emailButton.grid(row=0, column=2, pady=20, padx=10)

        printButton = Button(buttonFrame, text='PRINT', font=('arial', 16, 'bold'), bg='gray20', fg='white', bd=5,
                            width=8, pady=10, command=print_bill)
        printButton.grid(row=0, column=3, pady=20, padx=10)

        clearButton = Button(buttonFrame, text='CLEAR', font=('arial', 16, 'bold'), bg='gray20', fg='white', bd=5,
                            width=8, pady=10,command=clear)
        clearButton.grid(row=0, column=4, pady=20, padx=10)

        #invoiceButton = Button(buttonFrame, text='INVOICE', font=('arial', 16, 'bold'), bg='gray20', fg='white', bd=5,width=8, pady=10, command=invoice)
        #invoiceButton.grid(row=0, column=5, pady=20, padx=10)

        test_button = Button(buttonFrame, text='TEST', font=('arial', 16, 'bold'), bg='gray20', fg='white', bd=5,
                            width=8, pady=10,command=test_dummy_bill)
        test_button.grid(row=0, column=6, pady=20, padx=10)

        window.mainloop()

    elif username!='The Company' and password!='1234':
        messagebox.showerror("Invalid", "Invalid username and password")

    elif password!="1234":
        messagebox.showerror("Invalid", "Invalid Password")

    elif username!="The Company":
        messagebox.showerror("Invalid", "Invalid Username")

frame= Frame(root, width=350, height=350, bg="white")
frame.place(x=480, y=70)

heading=Label(frame, text='LOGIN', fg='#57a1f8', bg='white', font=('Microsoft YaHei UI Light',23,'bold'))
heading.place(x=100,y=5)

def on_enter(e):
    user.delete(0, 'end')

def on_leave(e):
    name=user.get()
    if name=='':
         user.insert(0, 'Username')

user= Entry(frame, width=25, fg='black', border=0, bg="white", font=('Microsoft YaHei UI Light',11))
user.place(x=30, y=80)
user.insert(0, 'Username')
user.bind('<FocusIn>', on_enter)
user.bind('<FocusOut>', on_leave)

Frame(frame,width=295, height=2, bg='black').place(x=25,y=107)

def on_enter(e):
    code.delete(0, 'end')

def on_leave(e):
    name=code.get()
    if name=='':
        code.insert(0, 'Password')
code= Entry(frame, width=25, fg='black', border=0, bg="white", font=('Microsoft YaHei UI Light',11), show='*')
code.place(x=30, y=150)
code.insert(0, 'Password')
code.bind('<FocusIn>', on_enter)
code.bind('<FocusOut>', on_leave)

Frame(frame,width=295, height=2, bg='black').place(x=25,y=177)

Button(frame, width=39, pady=7, text='Login', bg='#57a1f8', fg='white', border=0, command=signin).place(x=35,y=204)

root.mainloop()