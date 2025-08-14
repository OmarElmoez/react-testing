import { render, screen } from "@testing-library/react"
import UserList from "../../components/UserList"
import { User } from "../../entities"

describe('user list', () => {
  it('should return no users when users is an empty array', () => {
    render(<UserList users={[]} />)

    expect(screen.getByText(/no users/i)).toBeInTheDocument()
  })

  it('should return link with username for each user', () => {
    const users: User[] = [
      {
        id: 1,
        name: 'omar'
      }, 
      {
        id: 2,
        name: 'ali'
      }
    ]

    render(<UserList users={users} />)

    users.forEach(user => {
      const link = screen.getByRole('link', {name: user.name})
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`)
    })
  })
})