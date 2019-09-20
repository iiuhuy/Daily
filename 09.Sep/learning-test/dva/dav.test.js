import dva, { connect } from "dva";

test("dva should work", () => {
  const app = dva();
  app.model({
    namespace: "count",
    state: 0,
    reducers: {
      app(state) {
        return state + 1;
      }
    }
  });
  app.router(() => <div />);
  app.start();

  expect(app._store.getState().count).toEqual(0);
  app._store.dispatch({ type: "count/add" });
  // expect(app._store.getState().count).toEqual(1);
});
