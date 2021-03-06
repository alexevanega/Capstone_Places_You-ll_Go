"""empty message

Revision ID: 838649a39ded
Revises: 3a756504218f
Create Date: 2022-02-01 16:32:17.144267

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '838649a39ded'
down_revision = '3a756504218f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('visited_states_state_name_fkey', 'visited_states', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key('visited_states_state_name_fkey', 'visited_states', 'states', ['state_name'], ['state'])
    # ### end Alembic commands ###
