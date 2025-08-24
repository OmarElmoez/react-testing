import { render, screen } from "@testing-library/react"
import ProductList from "../../components/ProductList"
import { server } from "../mocks/server"
import { http, HttpResponse } from "msw"

describe('Poduct List', () => {
  it('should render list of products', async () => {
    render(<ProductList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0)
  })

  it('should render no products if list is empty', async () => {
    server.use(http.get('/products', () => HttpResponse.json([])));

    render(<ProductList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument()
  })
})