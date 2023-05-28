import PropTypes from "prop-types";
import Layout from "components/Layout";
import Meta from "components/Common/Meta";

import { ErrorBoundary } from "react-error-boundary";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const title = "React ChartJS 4 Example - Deni Apps";
const desc = `A simple example to demostrate how to use react-chartjs-2 V4 `;

const summary = desc;
const canonical = "https://deniapps.com/playground/chart";
const image = "https://deniapps.com/images/dna.png";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random(1, 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random(1, 1000)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Index = (props) => (
  <>
    <Meta
      title={title}
      desc={desc}
      summary={summary}
      canonical={canonical}
      image={image}
    />
    <Layout>
      <h1>React ChartJS 2 (V4)</h1>
      <p>
        This demo comes with Error Boundary - when for whatever reason Chart
        could not be loaded, we capture it.
      </p>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Line options={options} data={data} />
      </ErrorBoundary>
    </Layout>
  </>
);

Index.propTypes = {
  shows: PropTypes.array,
};

export default Index;
