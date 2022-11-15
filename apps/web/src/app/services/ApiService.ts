import api from './api';

export function getData(route: string, params: string) {
  return api.get(route.concat(params));
}

export function postData(route: string, header: any) {
  return api.post(route, {
    header
  })
}
