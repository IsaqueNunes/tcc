import api from './api';

export function getData(route: string, params?: string) {
  return api.get(route);
}

export function postData(route: string, body: any) {
  return api.post(route, body);
}
