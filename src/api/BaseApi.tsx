import 'whatwg-fetch';
import queryString from 'query-string';
import EventEmitter from 'event-emitter';
import { fetch } from 'whatwg-fetch';
import { GetMoviesParam } from './MovieApi';

export default class BaseApi extends EventEmitter {

  emit(arg0: string) {
    throw new Error("Method not implemented.");
  }

  baseUrl = process.env.REACT_APP_BASE_URL || '';
  apiKey = process.env.REACT_APP_API_KEY || '';
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  constructor (headers?: any) {
    super();
    this.headers = Object.assign(this.headers, headers);
  }

  getHeaders (headers?: Record<string, string>) {
    return {
      ...this.headers,
      ...headers,
    };
  }

  handleResponse = async (response: Response) => {
    if (!response.ok) {
      if (response.status === 401) {
        this.emit('tokenExpired');
      }
      const error = await response.json().catch(() => null);
      throw Error(error ? error.message : response.statusText);
    }
    return response.json();
  }

  get = (path: string, query?: GetMoviesParam, headers?: Record<string, string>) => {
    return fetch(`${this.baseUrl}${path}?${query ? queryString.stringify(query) : ''}&api_key=${this.apiKey}`, {
      headers: this.getHeaders(headers),
    }).then(this.handleResponse);
  }
}
