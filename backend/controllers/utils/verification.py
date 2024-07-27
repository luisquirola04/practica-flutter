import re

def validate_email(email):
    exp = r'^[(a-z0-9\_\-\.)]+@[(a-z0-9\_\-\.)]+\.[(a-z)]{2,4}$'
    return re.match(exp, email.lower()) is not None
