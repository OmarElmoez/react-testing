import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("order status", () => {
  const renderComponent = () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      trigger: screen.getByRole("combobox"),
      // lazy evaluation technique => postpone the excution of this code to the
      // future when we need it.
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) => screen.findByRole('option', {name: label}),
      user,
      onChange,
    };
  };

  it("should render NEW as a default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent("New");
  });

  it("should render the correct statuses", async () => {
    const { trigger, user, getOptions } = await renderComponent();

    user.click(trigger);

    const options = await getOptions();
    expect(options).toHaveLength(3);

    // options are HTML elements which have textContent prop
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    {
      label: /processed/i, value: 'processed'
    },
    {
      label: /fulfilled/i, value: 'fulfilled'
    },
  ])("should call onChange with $value value if user selected it", async ({label, value}) => {
    const { trigger, user, onChange, getOption } = renderComponent();

    await user.click(trigger);

    // new value will cause an error, since it's the default value
    // so when user click new, it didn't trigger the onChange function

    const option = await getOption(label)
    await user.click(option);

    expect(onChange).toBeCalledWith(value)
  });

  // to test new value, user should select another option, then select the new option
  it("should call onChange with 'new' value if user selected it", async () => {
    const {trigger, user, getOption, onChange} = renderComponent();

    await user.click(trigger)

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption)

    await user.click(trigger)

    const newOption = await getOption(/new/i);
    await user.click(newOption)

    expect(onChange).toBeCalledWith('new')
  })
});
