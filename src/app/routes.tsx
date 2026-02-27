import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/main-layout";
import { PortfolioBrief } from "./components/portfolio-brief";
import { RegulationBrief } from "./components/regulation-brief";
import { StocksBrief } from "./components/stocks-brief";
import { CountryBrief } from "./components/country-brief";
import { OverviewBrief } from "./components/overview-brief";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: OverviewBrief },
      { path: "portfolio", Component: PortfolioBrief },
      { path: "regulation", Component: RegulationBrief },
      { path: "stocks", Component: StocksBrief },
      { path: "country", Component: CountryBrief },
    ],
  },
]);
