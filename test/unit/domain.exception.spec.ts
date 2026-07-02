import { describe, it, expect } from 'vitest';
import { 
  DomainException, 
  ProjectDeletionNotAllowedException, 
  InvalidStatusTransitionException, 
  RiskCalculationException 
} from '../../src/domain/exceptions/domain.exception';

describe('Domain Exceptions', () => {
  it('should instantiate DomainException correctly', () => {
    const error = new DomainException('Base domain error');
    expect(error.message).toBe('Base domain error');
    expect(error.name).toBe('DomainException');
  });

  it('should instantiate ProjectDeletionNotAllowedException correctly', () => {
    const error = new ProjectDeletionNotAllowedException();
    expect(error.message).toBe('Project cannot be deleted while active.');
    expect(error.name).toBe('ProjectDeletionNotAllowedException');
  });

  it('should instantiate InvalidStatusTransitionException correctly', () => {
    const error = new InvalidStatusTransitionException();
    expect(error.message).toBe('Invalid status transition.');
    expect(error.name).toBe('InvalidStatusTransitionException');
  });

  it('should instantiate RiskCalculationException correctly', () => {
    const error = new RiskCalculationException();
    expect(error.message).toBe('Error during risk calculation.');
    expect(error.name).toBe('RiskCalculationException');
  });
});
