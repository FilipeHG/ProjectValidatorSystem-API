import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { AiAnalysisService, AiAnalysisResponse } from '../../infrastructure/ai/ai-analysis.service';

@Injectable()
export class GenerateProjectAnalysisUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly aiAnalysisService: AiAnalysisService,
  ) {}

  async execute(id: string): Promise<AiAnalysisResponse> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new HttpException({ title: 'Project Not Found', message: `Project with ID ${id} not found.` }, HttpStatus.NOT_FOUND);
    }

    return this.aiAnalysisService.generateAnalysis(project);
  }
}
