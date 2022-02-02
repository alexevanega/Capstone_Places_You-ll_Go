"""empty message

Revision ID: 1ed6def333b3
Revises: dc4ddcef5c5e
Create Date: 2022-01-30 18:55:51.021602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1ed6def333b3'
down_revision = 'dc4ddcef5c5e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('journal_entries', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('journal_entries', sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
