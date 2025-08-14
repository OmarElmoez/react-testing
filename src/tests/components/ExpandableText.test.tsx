import { render, screen } from "@testing-library/react";
import ExpandableText from "../../components/ExpandableText";
import userEvent from "@testing-library/user-event";

// it's better to use getByText istead of getByRole('article')
// since we care more about text not the wrapper for it

// when assert against button text, use keywords
// so instead of /show more/i use /more/i

// when using (getBy) it return an error if the element doesn't exist.
// so there is no need to use .toBeInTheDocument() after it, as long as there are
// other assertions after it.
// if there are not any assertions after (getBy), it's better to user .toBeInTheDocument()
// to make the test more clear.

describe("expandabel text", () => {
  const limit = 255;
  const shortText = "a".repeat(limit - 1);
  const textEqualLimit = "a".repeat(limit);
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render full text if less than limit", () => {
    render(<ExpandableText text={shortText} />);

    const textElement = screen.getByRole("article");

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(shortText);
  });

  it("should render full text if equal to limit", () => {
    render(<ExpandableText text={textEqualLimit} />);

    const textElement = screen.getByRole("article");

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(textEqualLimit);
  });

  it("should render truncated text and show more button if bigger that limit", () => {
    render(<ExpandableText text={longText} />);

    const textElement = screen.getByRole("article");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(truncatedText);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
  });

  it("should expand the text if show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const textElement = screen.getByRole("article");
    expect(textElement).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
    const user = userEvent.setup();
    await user.click(button);

    expect(textElement).toHaveTextContent(longText);
    expect(button).toHaveTextContent(/show less/i);
  });

  it("should collapse the text if show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const textElement = screen.getByRole("article");
    expect(textElement).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
    const user = userEvent.setup();
    await user.click(button);
    expect(button).toHaveTextContent(/show less/i);

    await user.click(button);

    expect(textElement).toHaveTextContent(truncatedText);
    expect(button).toHaveTextContent(/show more/i);
  });
});

// Best approach

describe("expandabel text", () => {
  const limit = 255;
  const shortText = "a".repeat(limit - 1);
  const textEqualLimit = "a".repeat(limit);
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render full text if less than limit", () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument()
  });

  it("should render full text if equal to limit", () => {
    render(<ExpandableText text={textEqualLimit} />);

    expect(screen.getByText(textEqualLimit)).toBeInTheDocument();
  });

  it("should render truncated text and render (show more) button if bigger that limit", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument()

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand the text if show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i)
  });

  it("should collapse the text if show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
    const user = userEvent.setup();
    await user.click(button);
    expect(button).toHaveTextContent(/less/i);

    await user.click(button);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});