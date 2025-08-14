import { render, screen } from "@testing-library/react"
import TagList from "../../components/TagList"

describe('Tags list', () => {
  it('render all tags', async () => {
    render(<TagList />)

    // await waitFor(() => {
    //   const listItems = screen.getAllByRole('listitem');
    //   expect(listItems.length).toBeGreaterThan(0)
    // })

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0)
  })
})