import { ProjectStatus } from '../enums/project-status.enum';
import { 
  InvalidStatusTransitionException, 
  ProjectDeletionNotAllowedException 
} from '../exceptions/domain.exception';
import { Projeto } from '../entities/projeto.entity';

export class ProjectStatusPolicy {
  static validateDeletion(projeto: Projeto): void {
    const forbiddenStatuses = [
      ProjectStatus.EM_ANDAMENTO,
      ProjectStatus.ENCERRADO,
    ];
    
    if (forbiddenStatuses.includes(projeto.status)) {
      throw new ProjectDeletionNotAllowedException();
    }
  }

  static validateTransition(currentStatus: ProjectStatus, nextStatus: ProjectStatus): void {
    if (currentStatus === nextStatus) {
      return;
    }

    if (nextStatus === ProjectStatus.CANCELADO) {
      return;
    }

    const allowedTransitions: Record<ProjectStatus, ProjectStatus[]> = {
      [ProjectStatus.EM_ANALISE]: [ProjectStatus.APROVADO],
      [ProjectStatus.APROVADO]: [ProjectStatus.EM_ANDAMENTO],
      [ProjectStatus.EM_ANDAMENTO]: [ProjectStatus.ENCERRADO],
      [ProjectStatus.ENCERRADO]: [],
      [ProjectStatus.CANCELADO]: [],
    };

    const allowed = allowedTransitions[currentStatus] || [];
    if (!allowed.includes(nextStatus)) {
      throw new InvalidStatusTransitionException(`Transição de status não permitida: de ${currentStatus} para ${nextStatus}.`);
    }
  }
}
