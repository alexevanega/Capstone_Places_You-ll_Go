"""empty message

Revision ID: a6c76f4e6488
Revises: 1ed6def333b3
Create Date: 2022-01-30 18:56:48.366945

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6c76f4e6488'
down_revision = '1ed6def333b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('journal_entries', sa.Column('id', sa.Integer(), nullable=False, autoincrement=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('journal_entries', 'id')
    # ### end Alembic commands ###
