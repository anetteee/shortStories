import { Query } from "../queries/Query";
import QueryOnId from "../queries/QueryOnId";

const HomePage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <QueryOnId />
      <Query />
    </div>
  );
};

export default HomePage;
