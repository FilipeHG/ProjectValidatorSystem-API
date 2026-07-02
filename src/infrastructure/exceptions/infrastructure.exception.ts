export class InfrastructureException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InfrastructureException';
  }
}

export class DatabaseConnectionException extends InfrastructureException {
  constructor(message: string = 'Database connection error.') {
    super(message);
    this.name = 'DatabaseConnectionException';
  }
}

export class AiProviderException extends InfrastructureException {
  constructor(message: string = 'AI provider error.') {
    super(message);
    this.name = 'AiProviderException';
  }
}

export class RepositoryException extends InfrastructureException {
  constructor(message: string = 'Repository error.') {
    super(message);
    this.name = 'RepositoryException';
  }
}
