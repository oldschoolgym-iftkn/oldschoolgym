from random import randint


def generate_confirmation_code() -> str:
    return str(randint(100, 999999)).zfill(6)
