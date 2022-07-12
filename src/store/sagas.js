import * as counterSagas from "./counter/saga";
import * as authSagas from "./auth/saga";

const sagas = {
  ...counterSagas,
  ...authSagas,
};

export default sagas;
