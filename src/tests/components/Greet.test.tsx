import { render, screen } from "@testing-library/react";
import Greet from "../../components/Greet";

describe('Greet', () => {
  it('should return hello name if name was provided', () => {
    render(<Greet name="omar" />)

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/omar/i)
  })

  it('should return login button if name was NOT provided', () => {
    render(<Greet />)

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i)
  })
})