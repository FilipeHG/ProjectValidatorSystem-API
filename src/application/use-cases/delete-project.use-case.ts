import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { ProjectStatusPolicy } from '../../domain/policies/project-status.policy';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new HttpException({ title: 'Project Not Found', message: `Project with ID ${id} not found.` }, HttpStatus.NOT_FOUND);
    }

    ProjectStatusPolicy.validateDeletion(project);
    await this.projectRepository.delete(id);
  }
}
