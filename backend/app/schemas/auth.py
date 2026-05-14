from marshmallow import EXCLUDE, Schema, ValidationError, fields, validate, validates_schema


class LoginSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=1))


class UserSignupSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    fullName = fields.String(required=True, validate=validate.Length(min=2))
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    country = fields.String(load_default="")
    interests = fields.List(fields.String(), load_default=list)

    @validates_schema
    def validate_interests(self, data, **kwargs):
        interests = data.get("interests", [])
        if not isinstance(interests, list):
            raise ValidationError({"interests": ["Interests must be a list."]})
