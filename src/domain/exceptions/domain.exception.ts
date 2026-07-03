export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class ProjectDeletionNotAllowedException extends DomainException {
  constructor(message: string = 'Project cannot be deleted while active.') {
    super(message);
    this.name = 'ProjectDeletionNotAllowedException';
  }
}

export class InvalidStatusTransitionException extends DomainException {
  constructor(message: string = 'Invalid status transition.') {
    super(message);
    this.name = 'InvalidStatusTransitionException';
  }
}

export class RiskCalculationException extends DomainException {
  constructor(message: string = 'Error during risk calculation.') {
    super(message);
    this.name = 'RiskCalculationException';
  }
}
