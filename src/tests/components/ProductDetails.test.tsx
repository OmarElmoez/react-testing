import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import ProductDetail from "../../components/ProductDetail";
import { db } from "../mocks/db";
import { Product } from "../../entities";
import { server } from "../mocks/server";
import { delay, http, HttpResponse } from "msw";

describe("Product Details", () => {
  let product: Product;
  
  beforeAll(() => {
    product = db.product.create();
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: product.id } } });
  });

  it("should render product details", async () => {
    render(<ProductDetail productId={product.id} />);

    const header = await screen.findByRole("heading");
    expect(header).toBeInTheDocument();

    const name = await screen.findByText(new RegExp(product.name, "i"));
    expect(name).toBeInTheDocument();

    const price = await screen.findByText(
      new RegExp(product.price.toString(), "i")
    );
    expect(price).toBeInTheDocument();
  });

  it("should render message if product not found", async () => {
    render(<ProductDetail productId={999} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error for invalid productId", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });

  it('should render an error message when there is an error', async () => {
    server.use(http.get(`/products/${product.id}`, () => HttpResponse.error()))

    render(<ProductDetail productId={product.id} />)

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })

  // ============ Loading State ============
  it('should render a loading indicator while fetching data', async () => {
    server.use(http.get(`products/${product.id}`, async () => {
      await delay();
      HttpResponse.json({})
    }))

    render(<ProductDetail productId={product.id} />)

    expect(await screen.findByText(/loading/i)).toBeInTheDocument()
  })

  it('should remove the loading indicator after data is fetched', async () => {
    render(<ProductDetail productId={product.id} />)

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
  })

  it('should remove the loading indicator if failed to fetch data', async () => {
    server.use(http.get(`products/${product.id}`, () => HttpResponse.error()))

    render(<ProductDetail productId={product.id} />)

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
  })
});
