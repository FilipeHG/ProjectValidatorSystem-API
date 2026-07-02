import { ProjectStatusPolicy } from '../../src/domain/policies/project-status.policy';
import { ProjectStatus } from '../../src/domain/enums/project-status.enum';
import { Projeto } from '../../src/domain/entities/projeto.entity';
import { ProjectRisk } from '../../src/domain/enums/project-risk.enum';
import { ProjectDeletionNotAllowedException } from '../../src/domain/exceptions/domain.exception';
import { describe, it, expect } from 'vitest';

describe('ProjectStatusPolicy', () => {
  const createMockProject = (status: ProjectStatus) => {
    return new Projeto(
      'id', 'nome', new Date(), new Date(), 1000, 'desc', status, ProjectRisk.BAIXO, new Date(), new Date()
    );
  };

  it('should prevent deletion of active projects', () => {
    const project = createMockProject(ProjectStatus.EM_ANDAMENTO);
    expect(() => ProjectStatusPolicy.validateDeletion(project)).toThrowError(ProjectDeletionNotAllowedException);
  });

  it('should allow deletion of EM_ANALISE projects', () => {
    const project = createMockProject(ProjectStatus.EM_ANALISE);
    expect(() => ProjectStatusPolicy.validateDeletion(project)).not.toThrowError();
  });
});
