import 'whatwg-fetch';
import queryString from 'query-string';
import EventEmitter from 'event-emitter';
import { fetch } from 'whatwg-fetch';
import { GetMoviesParam, SearchMoviesParam } from './MovieApi';

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

  constructor (headers?: Record<string, string>) {
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
    const { ok, status } = response;
    if(!ok) {
      if (status === 401) return {  ok,  ...(await response.json()) };
      if (status === 404) return { ok, ...(await response.json()) };
      if (status === 422) return { ok, ...(await response.json()) };
      if (status !== 422) return { ok, response};
    }

    switch(status) {
      case 201:
      case 204:
        return { ok };
      default:
        return response.json();
    }
  }

  get = (path: string, query?: GetMoviesParam | SearchMoviesParam, headers?: Record<string, string>) => {
    return fetch(`${this.baseUrl}${path}?${query ? queryString.stringify(query) : ''}&api_key=${this.apiKey}`, {
      headers: this.getHeaders(headers),
    }).then(this.handleResponse);
  }
}
