import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { AiAnalysisService } from '../ai/services/ai-analysis.service';
import { AiAnalysisResult } from '../ai/dto/ai-analysis-result.dto';

@Injectable()
export class GenerateProjectAnalysisUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly aiAnalysisService: AiAnalysisService,
  ) {}

  async execute(id: string): Promise<AiAnalysisResult> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new HttpException({ title: 'Project Not Found', message: `Project with ID ${id} not found.` }, HttpStatus.NOT_FOUND);
    }

    return this.aiAnalysisService.generateAnalysis(project);
  }
}
