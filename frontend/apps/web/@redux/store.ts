import rootReducer from "./reducers";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    //If it's on server side, create a store
    return configureStore({
      reducer: rootReducer,
      middleware: [],
    });
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");
    const storage: any = require("./sync_storage").default;

    const persistConfig = {
      key: "root",
      storage,
      blacklist: [
        "sidebarForm",
        "boundaryCenter",
        "currentMap",
        "mapsLayers",
        "featureForm",
      ],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: persistedReducer,
      middleware: [],
    }); // Creating the store again

    (store as any).__persistor = persistStore(store);

    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;

// export const wrapper = createWrapper<AppStore>(makeStore);

export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
