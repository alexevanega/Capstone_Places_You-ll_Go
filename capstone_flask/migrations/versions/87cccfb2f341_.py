"""empty message

Revision ID: 87cccfb2f341
Revises: 33cff4f6e439
Create Date: 2022-01-22 17:07:54.884143

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '87cccfb2f341'
down_revision = '33cff4f6e439'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('photos')
    op.drop_table('albums')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('albums',
    sa.Column('title', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('user', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user'], ['user.id'], name='albums_user_fkey'),
    sa.PrimaryKeyConstraint('title', name='albums_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('photos',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('photo', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('caption', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('album', sa.TEXT(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['album'], ['albums.title'], name='photos_album_fkey'),
    sa.PrimaryKeyConstraint('id', name='photos_pkey')
    )
    # ### end Alembic commands ###
