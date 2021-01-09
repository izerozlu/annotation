import { RequestResult } from '@/models/http-response.interface';

const BASE = '/api';

export default {
  get: async <T>({ path }) => {
    let result: RequestResult<T>;

    try {
      const response = await fetch(`${BASE}${path}`);
      const data = await response.json();
      result = {
        success: true,
        data,
      };
    } catch (e) {
      console.error(e);
      result = {
        success: false,
        data: undefined,
      };
    }

    return result;
  },
};
