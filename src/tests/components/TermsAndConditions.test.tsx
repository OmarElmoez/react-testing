import { render, screen } from "@testing-library/react"
import TermsAndConditions from "../../components/TermsAndConditions"
import userEvent from "@testing-library/user-event"

describe('terms and conditions', () => {

  const renderComp = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button')
    }
  }

  it('should render with correct text and initial state', () => {
    const {heading, checkbox, button} = renderComp()

    expect(heading).toHaveTextContent('Terms & Conditions')

    // wrong
    // const checkbox = screen.getByRole('checkbox', {name: 'agree'}); 

    // // correct
    // const checkbox = screen.getByRole('checkbox', {name: 'I accept the terms and conditions.'}); 
    expect(checkbox).not.toBeChecked()

    expect(button).toBeDisabled()
  })

  it('should enable button when checkbox is checked', async () => {
    const {checkbox, button} = renderComp()

    const user = userEvent.setup();
    await user.click(checkbox)

    expect(button).toBeEnabled()
  })
})