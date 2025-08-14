import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../components/ProductImageGallery";

describe("product image gallery", () => {
  it("should return nothing if no images", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container.firstChild).toBeNull();
    // OR
    expect(container).toBeEmptyDOMElement()
  });

  it("should render images with url as its src value", () => {
    const mockUrls = ['url1', 'url2'];

    render(<ProductImageGallery imageUrls={mockUrls} />);

    const allImgs = screen.getAllByRole("img");
    expect(allImgs).toHaveLength(mockUrls.length);

    allImgs.forEach((img, idx) => {
      expect(img).toHaveAttribute("src", mockUrls[idx]);
    });
  });
});
