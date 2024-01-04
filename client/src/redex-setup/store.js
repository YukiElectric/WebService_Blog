import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";
import reducers from './reducers';
const persistConfig = {
    key : "redux-store",
    storage : storage,
    keyPrefix: "key"
}

const store = createStore(persistReducer(persistConfig, reducers));
persistStore(store);
export default store;