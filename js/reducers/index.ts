import { combineReducers } from "redux";
import {
  PLAY,
  PLAY_TRACK,
  IS_PLAYING,
  PAUSE,
  STOP,
  IS_STOPPED,
  SET_BALANCE,
  SET_MEDIA,
  SET_VOLUME,
  TOGGLE_REPEAT,
  TOGGLE_SHUFFLE,
  TOGGLE_TIME_MODE,
  UPDATE_TIME_ELAPSED,
  ADD_TRACK_FROM_URL,
  ADD_TRACK_FROM_URI,
  S_UPDATE_PLAYER_OBJECT
} from "../actionTypes";

import desktop, { DesktopState } from "./desktop";
import explorer, { ExplorerState } from "./explorer";
import user, { UserState } from "./user";

const media = (state: any, action: any) => {
  if (!state) {
    return {
      player: null,
      id: null,
      timeMode: "ELAPSED",
      timeElapsed: 0,
      length: null, // Consider renaming to "duration"
      kbps: "360",
      khz: 48,
      // The winamp ini file declares the default volume as "200".
      // The UI seems to show a default volume near 78, which would
      // math with the default value being 200 out of 255.
      volume: Math.round((200 / 255) * 100),
      balance: 0,
      channels: null,
      shuffle: false,
      repeat: false,
      // TODO: Enforce possible values
      status: "STOPPED"
    };
  }
  switch (action.type) {
    // TODO: Make these constants
    case PLAY:
    case IS_PLAYING:
    case "S_PLAY_URI":
    case PLAY_TRACK:
      return { ...state, status: "PLAYING" };
    case PAUSE:
      return { ...state, status: "PAUSED" };
    case STOP:
    case IS_STOPPED:
      return { ...state, status: "STOPPED" };
    case TOGGLE_TIME_MODE:
      const newMode = state.timeMode === "REMAINING" ? "ELAPSED" : "REMAINING";
      return { ...state, timeMode: newMode };
    case UPDATE_TIME_ELAPSED:
      return { ...state, timeElapsed: action.elapsed };
    case ADD_TRACK_FROM_URL:
      return {
        ...state
      };
    case ADD_TRACK_FROM_URI:
      return {
        ...state
      };
    case SET_MEDIA:
      return {
        ...state,
        length: action.length,
        kbps: action.kbps,
        khz: action.khz,
        channels: action.channels
      };
    case SET_VOLUME:
      return { ...state, volume: action.volume };
    case SET_BALANCE:
      return { ...state, balance: action.balance };
    case TOGGLE_REPEAT:
      return { ...state, repeat: !state.repeat };
    case TOGGLE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };
    case S_UPDATE_PLAYER_OBJECT:
      return {
        ...state,
        player: action.player,
        id: action.id,
        getOAuthToken: action.getOAuthToken,
        volume: action.volume,
        name: action.name,
        balance: action.balance,
        channels: action.channels,
        shuffle: action.shuffle,
        repeat: action.repeat
      };
    default:
      return state;
  }
};

export interface AppState {
  media: any;
  network: any;
  explorer: ExplorerState;
  desktop: DesktopState;
  user: UserState;
}

const reducer = combineReducers<AppState>({
  media,
  explorer,
  desktop,
  user
});

export default reducer;
