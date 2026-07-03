import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { Projeto } from '../../domain/entities/projeto.entity';
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import { ProjectStatusPolicy } from '../../domain/policies/project-status.policy';

@Injectable()
export class ChangeProjectStatusUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(id: string, nextStatus: ProjectStatus): Promise<Projeto> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new HttpException({ title: 'Project Not Found', message: `Project with ID ${id} not found.` }, HttpStatus.NOT_FOUND);
    }

    ProjectStatusPolicy.validateTransition(project.status, nextStatus);

    const updated = await this.projectRepository.update(id, { status: nextStatus });
    if (!updated) {
      throw new HttpException('Failed to update project status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return updated;
  }
}
