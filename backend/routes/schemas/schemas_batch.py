schema_save_batch = {
    "type": "object",
    "properties": {
        "maker": {"type": "string"},
        "price_batch": {"type": "number"},
        "arrive_date":{"type": "string", "format": "date-time"}
    },
    "required": ["maker", "price_batch", "arrive_date"]
}
