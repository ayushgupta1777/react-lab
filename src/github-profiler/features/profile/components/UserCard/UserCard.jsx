import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ListCard, ListCardTitle } from '../../../../components/common/ListCardStyles';

const UserListCard = styled(ListCard)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem;

  &:hover .user-list-avatar {
    transform: scale(1.1);
    border-color: var(--accent);
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  transition: transform var(--transition-bounce);
`;

const ViewProfileLink = styled(Link)`
  text-decoration: none;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
`;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function UserCard({ user }) {
  return (
    <UserListCard variants={itemVariants}>
      <Avatar
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="user-list-avatar"
      />
      <div style={{ flex: 1 }}>
        <ListCardTitle>
          <Link
            to={`?username=${user.login}`}
            style={{ color: 'var(--text-primary)' }}
          >
            {user.login}
          </Link>
        </ListCardTitle>
      </div>
      <ViewProfileLink
        to={`?username=${user.login}`}
        className="btn btn-secondary"
      >
        View Profile
      </ViewProfileLink>
    </UserListCard>
  );
}
