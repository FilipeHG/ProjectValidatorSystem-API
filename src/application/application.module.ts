import { Module } from '@nestjs/common';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { ListProjectsUseCase } from './use-cases/list-projects.use-case';
import { GetProjectUseCase } from './use-cases/get-project.use-case';
import { UpdateProjectUseCase } from './use-cases/update-project.use-case';
import { DeleteProjectUseCase } from './use-cases/delete-project.use-case';
import { ChangeProjectStatusUseCase } from './use-cases/change-project-status.use-case';
import { GenerateProjectAnalysisUseCase } from './use-cases/generate-project-analysis.use-case';
import { RiskCalculationService } from '../domain/services/risk-calculation.service';
import { PROJECT_REPOSITORY } from './repositories/project.repository.interface';
import { ProjectRepository } from '../infrastructure/repositories/project.repository';
import { AiModule } from './ai/ai.module';

const useCases = [
  CreateProjectUseCase,
  ListProjectsUseCase,
  GetProjectUseCase,
  UpdateProjectUseCase,
  DeleteProjectUseCase,
  ChangeProjectStatusUseCase,
  GenerateProjectAnalysisUseCase,
];

@Module({
  imports: [AiModule],
  providers: [
    ...useCases,
    RiskCalculationService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
  ],
  exports: [...useCases],
})
export class ApplicationModule {}
