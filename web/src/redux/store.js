import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Actions} from 'p-flux';
import RetroReducer from './reducers/retro-reducer';
import MessageReducer from './reducers/message_reducer';
import UserReducer from './reducers/user_reducer';
import ConfigReducer from './reducers/config_reducer';
import ArchiveMiddleware from './middleware/archive-retro-middleware';
import RouterMiddleware from './middleware/router-middleware';
import AuthMiddleware from './middleware/auth-middleware';
import RetroMiddleware from './middleware/retro-middleware';
import AnalyticsMiddleware from './middleware/analytics-middleware';
import MessageMiddleware from './middleware/message_middleware';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const getReduxStore = (router, retroClient, analyticsClient) => createStore(combineReducers({
  retro: RetroReducer(),
  messages: MessageReducer(),
  user: UserReducer(),
  config: ConfigReducer(),
}), composeEnhancers(applyMiddleware(
  ArchiveMiddleware(Actions),
  AnalyticsMiddleware(analyticsClient),
  RouterMiddleware(router),
  AuthMiddleware(window.localStorage),
  RetroMiddleware(retroClient),
  MessageMiddleware(),
)));


export default getReduxStore;
