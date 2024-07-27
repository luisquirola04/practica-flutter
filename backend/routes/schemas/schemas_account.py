schema_save_account = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "last_name": {"type": "string"},
        "dni": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "password": {"type": "string"}
    },
    "required": ["name", "last_name", "dni", "email", "password"]
}

schema_sesion = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string', 'format': 'email'},
        'password': {'type': 'string', 'minLength': 2}
    },
    'required': ['email', 'password']
}