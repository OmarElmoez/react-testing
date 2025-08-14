import { render, screen } from "@testing-library/react"
import SearchBox from "../../components/SearchBox"
import userEvent from "@testing-library/user-event";

describe('Search box', () => {

  const renderSearchBox = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />)

    return {
      input: screen.getByRole('searchbox'),
      user: userEvent.setup(),
      onChange
    }
  }

  it('should render an input with type search', () => {
    const {input} = renderSearchBox();
    // input with type: 'text' => role: textbox
    // input with type: 'search' => role: searchbox

    expect(input).toBeInTheDocument();
    // you can use getByPLaceholder(/search/i)
    // but byRole is better
  })

  it('should call onChange when user hits enter', async () => {
    const searchValue = 'hello'

    const {input, onChange, user} = renderSearchBox();

    // to simulate hit enter
    await user.type(input, `${searchValue}{enter}`);
    
    // we need to ensure that the function is called with the right value.
    // so there is no need to user .toHaveVale()

    // expect(input).toHaveValue(searchValue)
    // expect(onChange).toBeCalled()

    expect(onChange).toBeCalledWith(searchValue)
  })

  it('should not call onChange if search input is empty', async () => {
    const {input, onChange, user} = renderSearchBox();

    // to simulate hit enter
    await user.type(input, '{enter}');

    expect(onChange).not.toBeCalled()
  })

})