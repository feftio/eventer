import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";

export default function Brand() {
  const { brand } = useParams();
  // const { url } = useRouteMatch();
  return (
    <Fragment>
      <h1>Brand {brand}</h1>
      <div className="">
        <Route path="brand/hello">
          <div>Hello</div>
        </Route>
      </div>
    </Fragment>
  );
}

