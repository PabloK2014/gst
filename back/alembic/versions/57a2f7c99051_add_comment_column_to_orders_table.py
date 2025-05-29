"""Add comment column to orders table

Revision ID: 57a2f7c99051
Revises: 
Create Date: 2025-05-29 15:23:25.632563

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '57a2f7c99051'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('orders', sa.Column('comment', sa.String(), nullable=True))


def downgrade() -> None:
    op.drop_column('orders', 'comment')
