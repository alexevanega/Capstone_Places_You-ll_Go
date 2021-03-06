"""empty message

Revision ID: b48511722d01
Revises: 4ad5d8a000de
Create Date: 2022-01-18 11:11:26.648393

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b48511722d01'
down_revision = '4ad5d8a000de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('journal_entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.Text(), nullable=False),
    sa.Column('entry', sa.Text(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photo_albums',
    sa.Column('title', sa.Text(), nullable=False),
    sa.Column('photo', sa.Text(), nullable=False),
    sa.Column('caption', sa.Text(), nullable=True),
    sa.Column('mimetype', sa.Text(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('title')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('photo_albums')
    op.drop_table('journal_entries')
    # ### end Alembic commands ###
