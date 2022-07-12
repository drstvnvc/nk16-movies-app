import * as counterSagas from "./counter/saga";
import * as authSagas from "./auth/saga";
import * as moviesSagas from "./movies/saga";

const sagas = {
  ...counterSagas,
  ...authSagas,
  ...moviesSagas,
};

export default sagas;
