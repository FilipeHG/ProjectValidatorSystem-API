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
      ProjectStatus.CANCELADO,
    ];
    
    if (forbiddenStatuses.includes(projeto.status)) {
      throw new ProjectDeletionNotAllowedException();
    }
  }

  static validateTransition(currentStatus: ProjectStatus, nextStatus: ProjectStatus): void {
    if (currentStatus === nextStatus) {
      return;
    }
    
    // Terminal statuses
    if (currentStatus === ProjectStatus.ENCERRADO || currentStatus === ProjectStatus.CANCELADO) {
      throw new InvalidStatusTransitionException(`Cannot transition from ${currentStatus} to ${nextStatus}. Status is terminal.`);
    }
  }
}
