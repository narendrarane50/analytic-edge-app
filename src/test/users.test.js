import { render, screen } from '@testing-library/react';
import UsersTable from '../Components/Users';

describe('UsersTable', () => {
  const users = [
    { id: 1 },
    { id: 2 },
  ];

  test('renders table headers correctly', () => {
    render(<UsersTable users={users} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    
  });


});
