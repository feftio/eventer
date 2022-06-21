def exclude_fields(serializer, fields):
    setattr(serializer.Meta, 'fields', None)
    setattr(serializer.Meta, 'exclude', fields)
    return serializer


def update_fields(serializer, fields):
    setattr(serializer.Meta, 'fields', fields)
    setattr(serializer.Meta, 'exclude', None)
    return serializer
