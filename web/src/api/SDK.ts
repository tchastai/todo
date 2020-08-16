interface Options {
  baseUrl: string;
}

export enum HealthStatus {
  PASS = 'pass',
  DOWN = 'down',
}

const API_ROUTES = {
  identity: {
    authenticate: '/identity/authenticate',
    users: '/identity/users',
  },
  synchronization: {
    lists: '/lists',
  },
  server: {
    health: '/health',
  },
};

export class InvalidCredentialsError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Invalid credentials';
    this.name = 'InvalidCredentialsError';
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = message || 'User already exists';
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Invalid email';
    this.name = 'InvalidEmailError';
  }
}

export class Client {
  private baseUrl: string;

  constructor(options: Options) {
    this.baseUrl = options.baseUrl;
  }

  public static hasCredentials() {
    return !!localStorage.getItem('sessionToken') && !!localStorage.getItem('sessionEmail');
  }

  public async getLists() {
    const request = {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
    };

    const httpResponse = await fetch(`${this.baseUrl}${API_ROUTES.synchronization.lists}`, request);
    const response = await httpResponse.json();

    return response.lists;
  }

  public async synchronizeLists(lists: object[]) {
    const request = {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
      body: JSON.stringify({
        userEmail: localStorage.getItem('sessionEmail'),
        lists,
      }),
    };

    const httpResponse = await fetch(`${this.baseUrl}${API_ROUTES.synchronization.lists}`, request);
    const response = await httpResponse.json();

    switch (httpResponse.status) {
      case 401:
        throw new InvalidCredentialsError();
      default:
        return response;
    }
  }

  public async createUser(email: string, password: string) {
    const request = {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    };

    const httpResponse = await fetch(`${this.baseUrl}${API_ROUTES.identity.users}`, request);

    switch (httpResponse.status) {
      case 201:
        return true;
      case 409:
        throw new UserAlreadyExistsError();
      case 500:
        throw new InvalidEmailError();
      default:
        throw new Error();
    }
  }

  public async authenticate(email: string, password: string): Promise<string> {
    const request = {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(`${this.baseUrl}${API_ROUTES.identity.authenticate}`, request);

    const { token } = await response.json();

    if (response.status === 404 || response.status === 401) {
      throw new InvalidCredentialsError();
    }

    localStorage.setItem('sessionToken', token);
    localStorage.setItem('sessionEmail', email);

    return token;
  }

  public async getHealth() {
    const response = await fetch(`${this.baseUrl}${API_ROUTES.server.health}`);
    if (response.status === 200) {
      return HealthStatus.PASS;
    } else {
      return HealthStatus.DOWN;
    }
  }
}

class SDK {
  public static getClient(options?: Options) {
    const defaultOptions = {
      baseUrl: process.env.VUE_APP_SYNC_API_URL,
      userEmail: localStorage.getItem('sessionEmail') || undefined,
      sessionToken: localStorage.getItem('sessionToken') || undefined,
    };
    return new Client({ ...defaultOptions, ...options });
  }
}

export default SDK;
