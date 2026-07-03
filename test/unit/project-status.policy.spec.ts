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

  describe('validateTransition', () => {
    it('should do nothing if current status matches next status', () => {
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.EM_ANALISE, ProjectStatus.EM_ANALISE)).not.toThrowError();
    });

    it('should allow valid transitions', () => {
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.EM_ANALISE, ProjectStatus.APROVADO)).not.toThrowError();
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.APROVADO, ProjectStatus.EM_ANDAMENTO)).not.toThrowError();
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.EM_ANDAMENTO, ProjectStatus.ENCERRADO)).not.toThrowError();
    });

    it('should allow transition to CANCELADO from any status', () => {
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.EM_ANALISE, ProjectStatus.CANCELADO)).not.toThrowError();
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.APROVADO, ProjectStatus.CANCELADO)).not.toThrowError();
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.EM_ANDAMENTO, ProjectStatus.CANCELADO)).not.toThrowError();
    });

    it('should throw InvalidStatusTransitionException for invalid transitions', () => {
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.EM_ANALISE, ProjectStatus.EM_ANDAMENTO))
        .toThrowError('Transição de status não permitida: de Em análise para Em andamento.');
        
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.ENCERRADO, ProjectStatus.EM_ANALISE))
        .toThrowError('Transição de status não permitida: de Encerrado para Em análise.');
        
      expect(() => ProjectStatusPolicy.validateTransition(ProjectStatus.CANCELADO, ProjectStatus.EM_ANALISE))
        .toThrowError('Transição de status não permitida: de Cancelado para Em análise.');
    });
  });
});
