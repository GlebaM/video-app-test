import { render, screen } from "@testing-library/react";
import MainSplash from "./components/Splash/MainSplash";

test(`renders element "Get started"`, () => {
  render(<MainSplash />);
  const linkElement = screen.getByText(/Get started./i);
  expect(linkElement).toBeInTheDocument();
});
