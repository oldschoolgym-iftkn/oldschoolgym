from sqlalchemy import MetaData, Table, Column, Integer, String, Date, Boolean, ForeignKey

metadata = MetaData()

categories = Table(
    "coaches_categories",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("category", String(50), nullable=False, unique=True),
)

positions = Table(
    "positions",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("position", String(50), nullable=False, unique=True),
)

coaches = Table(
    "coaches",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(40), nullable=False),
    Column("surname", String(40), nullable=False),
    Column("bday", Date(), nullable=False),
    Column("phone", String(20), nullable=False, unique=True),
    Column("category_id", Integer, ForeignKey(
        "coaches_categories.id"), nullable=False),
    Column("position_id", Integer, ForeignKey(
        "positions.id"), nullable=False),
    Column("sex", Boolean, nullable=False),
    Column("avatar", String(255), nullable=False),
)
