import { describe, it, expect } from 'vitest';
import {
  InfrastructureException,
  DatabaseConnectionException,
  AiProviderException,
  RepositoryException
} from '../../src/infrastructure/exceptions/infrastructure.exception';

describe('Infrastructure Exceptions', () => {
  describe('InfrastructureException', () => {
    it('should be instantiated with correct properties', () => {
      const error = new InfrastructureException('Base infrastructure error');
      expect(error.message).toBe('Base infrastructure error');
      expect(error.name).toBe('InfrastructureException');
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('DatabaseConnectionException', () => {
    it('should use default message if none provided', () => {
      const error = new DatabaseConnectionException();
      expect(error.message).toBe('Database connection error.');
      expect(error.name).toBe('DatabaseConnectionException');
      expect(error instanceof InfrastructureException).toBe(true);
    });

    it('should use custom message if provided', () => {
      const error = new DatabaseConnectionException('Custom DB error');
      expect(error.message).toBe('Custom DB error');
      expect(error.name).toBe('DatabaseConnectionException');
    });
  });

  describe('AiProviderException', () => {
    it('should use default message if none provided', () => {
      const error = new AiProviderException();
      expect(error.message).toBe('AI provider error.');
      expect(error.name).toBe('AiProviderException');
      expect(error instanceof InfrastructureException).toBe(true);
    });

    it('should use custom message if provided', () => {
      const error = new AiProviderException('Custom AI error');
      expect(error.message).toBe('Custom AI error');
      expect(error.name).toBe('AiProviderException');
    });
  });

  describe('RepositoryException', () => {
    it('should use default message if none provided', () => {
      const error = new RepositoryException();
      expect(error.message).toBe('Repository error.');
      expect(error.name).toBe('RepositoryException');
      expect(error instanceof InfrastructureException).toBe(true);
    });

    it('should use custom message if provided', () => {
      const error = new RepositoryException('Custom repo error');
      expect(error.message).toBe('Custom repo error');
      expect(error.name).toBe('RepositoryException');
    });
  });
});
