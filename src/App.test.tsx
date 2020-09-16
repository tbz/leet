import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Contribute", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Contribute/i);
  expect(linkElement).toBeInTheDocument();
});
