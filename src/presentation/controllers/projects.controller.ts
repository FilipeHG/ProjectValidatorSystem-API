import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UsePipes, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { ListProjectsUseCase } from '../../application/use-cases/list-projects.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import { ChangeProjectStatusUseCase } from '../../application/use-cases/change-project-status.use-case';
import { GenerateProjectAnalysisUseCase } from '../../application/use-cases/generate-project-analysis.use-case';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { createProjectSchema, CreateProjectDto, updateProjectSchema, UpdateProjectDto, changeStatusSchema, ChangeStatusDto } from '../dto/project.dto';
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly listProjectsUseCase: ListProjectsUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly changeProjectStatusUseCase: ChangeProjectStatusUseCase,
    private readonly generateProjectAnalysisUseCase: GenerateProjectAnalysisUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProjectSchema))
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  async findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.listProjectsUseCase.execute(Number(page), Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getProjectUseCase.execute(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateProjectSchema))
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.updateProjectUseCase.execute(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.deleteProjectUseCase.execute(id);
  }

  @Patch(':id/status')
  @UsePipes(new ZodValidationPipe(changeStatusSchema))
  async changeStatus(@Param('id') id: string, @Body() changeStatusDto: ChangeStatusDto) {
    return this.changeProjectStatusUseCase.execute(id, changeStatusDto.status as ProjectStatus);
  }

  @Get(':id/ai-analysis')
  async getAiAnalysis(@Param('id') id: string) {
    return this.generateProjectAnalysisUseCase.execute(id);
  }
}
