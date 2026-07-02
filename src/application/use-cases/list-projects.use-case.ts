import { Injectable, Inject } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { Projeto } from '../../domain/entities/projeto.entity';

export interface ListProjectsOutput {
  data: Projeto[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class ListProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10): Promise<ListProjectsOutput> {
    const { data, total } = await this.projectRepository.findAll(page, limit);
    return {
      data,
      total,
      page,
      limit,
    };
  }
}
