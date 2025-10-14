export const tokenStore = {
  _token: null as string | null,

  get() {
    return this._token;
  },

  set(token: string) {
    this._token = token;
  },

  clear() {
    this._token = null;
  },
};
