from email.mime.text import MIMEText
import smtplib

def send_email_to(email, height, average_height, count):
    from_email = "codershaman@gmail.com"
    from_password = "Coding15Fun"
    to_email = email
    subject = "Height Data"
    message = "Hey there, <br> Your height is <strong>%s</strong> cm. <br> Average height of %s people is %s cm." % (height, count, average_height)

    msg = MIMEText(message, 'html')
    msg['Subject'] = subject
    msg['To'] = to_email
    msg['From'] = from_email

    fmail = smtplib.SMTP('smtp.gmail.com', 587)
    fmail.ehlo()
    fmail.starttls()
    fmail.login(from_email, from_password)
    fmail.send_message(msg)
