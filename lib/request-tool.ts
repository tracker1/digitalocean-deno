// deno-lint-ignore-file no-explicit-any

interface Result<T> {
  response: Response;
  data?: T;
  text?: string | null;
}

class RequestTool {
  baseUrl = '';
  token = '';

  constructor() {
    this;
  }

  #getHeaders = (method: string) => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      Accept: `application/json, text/plain, */*`
    };
    switch (method.toLowerCase()) {
      case 'put':
      case 'post':
      case 'patch':
        headers['Content-Type'] = `application/json`;
    }
    return headers;
  };

  async #query(method: string, path: string, body?: any): Promise<Result<any>> {
    const opts: any = {
      method,
      headers: this.#getHeaders(method)
    };
    if (body !== undefined) {
      opts.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${path}`, opts);

    const text: string | null = await response.text().catch(_ => null);
    let data: any = null;
    try {
      if (text) {
        data = JSON.parse(data);
      }
    } catch (_) {
      // do nothing
    }

    if (response.status > 500) {
      throw Object.assign(new Error('Server Error Result'), {
        response,
        text,
        data
      });
    }
    if (response.status > 400) {
      throw Object.assign(new Error('Client Error Result'), {
        response,
        text,
        data
      });
    }

    return { response, text, data };
  }

  head = (path: string) => this.#query('HEAD', path);

  get = (path: string) => this.#query('GET', path);

  put = (path: string, value: any) => this.#query('PUT', path, value);

  post = (path: string, value: any) => this.#query('POST', path, value);

  patch = (path: string, value: any) => this.#query('PATCH', path, value);

  delete(path: string, value?: any) {
    return this.#query('DELETE', path, value);
  }
}

export const request = new RequestTool();
