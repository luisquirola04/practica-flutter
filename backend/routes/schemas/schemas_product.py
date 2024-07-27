schema_save_product = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "batch_uid": {"type": "string"},
        "product_price": {"type": "number"},
        "elaborate_date": {"type": "string", "format": "date-time"},
        "expired_date": {"type": "string", "format": "date-time"},
        "quantity": {"type": "number"}

    },
    "required": ["name", "batch_uid", "product_price", "elaborate_date", "expired_date","quantity"]
}

schemaModidyProduct = {
    'type' : 'object',
    'propierties' : {
        'uid': {'type': 'string'},
        "name": {"type": "string"},
        "batch_uid": {"type": "string"},
        "product_price": {"type": "number"},
        "elaborate_date": {"type": "string"},
        "expired_date": {"type": "string"},
        "quantity": {"type": "number"}
    },
    "required": ["uid","name", "batch_uid", "product_price", "elaborate_date", "expired_date","quantity"]
}
