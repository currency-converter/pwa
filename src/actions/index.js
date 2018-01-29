/*
 * action types
 */

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

/*
 * action creators
 */

export function updateSettings(newSettings) {
  return { type: UPDATE_SETTINGS, newSettings };
}

export function toggleFavorite(currency) {
  return { type: TOGGLE_FAVORITE, currency };
}
