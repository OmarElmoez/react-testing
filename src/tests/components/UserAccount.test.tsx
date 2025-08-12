import { render, screen } from "@testing-library/react"
import UserAccount from "../../components/UserAccount"
import { User } from "../../entities"

describe('user account', () => {

  const user: User = {
    id: 1,
    name: 'omar', 
  }

  it("should display user name", () => {
    render(<UserAccount user={user} />)

    const nameElement = screen.getByText(new RegExp(user.name, "i"));

    expect(nameElement).toBeInTheDocument()
  })

  it('should not render an edit button if user not an admin', () => {
    render(<UserAccount user={user} />)

    const buttonElement = screen.queryByRole('button');

    expect(buttonElement).not.toBeInTheDocument()
  })

  it('should render an edit button if user is an admin', () => {
    user.isAdmin = true;

    render(<UserAccount user={user} />)

    const buttonElement = screen.getByRole('button');
    
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent(/edit/i)
  })
})