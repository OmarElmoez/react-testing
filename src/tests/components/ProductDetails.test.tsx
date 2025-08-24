import { render, screen } from "@testing-library/react";
import ProductDetail from "../../components/ProductDetail";
import { products } from "../mocks/data";

describe("Product Details", () => {
  it("should render invalid product id if pass 0", async () => {
    render(<ProductDetail productId={0} />);
    const message = await screen.findByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });

  it("should render product details", async () => {
    render(<ProductDetail productId={1} />);

    const header = await screen.findByRole("heading");
    expect(header).toBeInTheDocument();

    const name = await screen.findByText(new RegExp(products[0].name, "i"));
    expect(name).toBeInTheDocument();

    const price = await screen.findByText(
      new RegExp(products[0].price.toString(), "i")
    );
    expect(price).toBeInTheDocument();
  });

  it('should render message if product not found', async () => {
    render(<ProductDetail productId={999} />)

    const message = await screen.findByText(/not found/i)
    expect(message).toBeInTheDocument()
  })

  it('should render an error for invalid productId', async () => {
    render(<ProductDetail productId={0} />)

    const message = await screen.findByText(/invalid/i)
    expect(message).toBeInTheDocument()
  })
});
