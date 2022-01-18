"""empty message

Revision ID: f0691e10eab7
Revises: 516db17e6263
Create Date: 2022-01-11 20:50:14.753546

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0691e10eab7'
down_revision = '516db17e6263'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('states', sa.Column('population', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('states', 'population')
    # ### end Alembic commands ###