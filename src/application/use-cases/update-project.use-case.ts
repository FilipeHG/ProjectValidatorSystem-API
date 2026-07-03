import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { Projeto } from '../../domain/entities/projeto.entity';
import { RiskCalculationService } from '../../domain/services/risk-calculation.service';

export interface UpdateProjectInput {
  nome?: string;
  dataDeInicio?: string;
  previsaoDeTermino?: string;
  orcamentoTotal?: number;
  descricao?: string;
}

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly riskCalculationService: RiskCalculationService,
  ) {}

  async execute(id: string, input: UpdateProjectInput): Promise<Projeto> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new HttpException({ title: 'Project Not Found', message: `Project with ID ${id} not found.` }, HttpStatus.NOT_FOUND);
    }

    const updateData: any = { ...input };

    const dataDeInicio = input.dataDeInicio ? new Date(input.dataDeInicio) : project.dataDeInicio;
    const previsaoDeTermino = input.previsaoDeTermino ? new Date(input.previsaoDeTermino) : project.previsaoDeTermino;
    const orcamentoTotal = input.orcamentoTotal !== undefined ? input.orcamentoTotal : project.orcamentoTotal;
    
    if (previsaoDeTermino < dataDeInicio) {
      throw new HttpException({ 
        title: 'Validation Error', 
        message: 'A previsão de término não pode ser anterior à data de início.' 
      }, HttpStatus.BAD_REQUEST);
    }
    
    if (input.dataDeInicio || input.previsaoDeTermino || input.orcamentoTotal !== undefined) {
      updateData.riscoCalculado = this.riskCalculationService.calculateRisk(
        orcamentoTotal,
        dataDeInicio,
        previsaoDeTermino
      );
    }

    if (input.dataDeInicio) updateData.dataDeInicio = new Date(input.dataDeInicio);
    if (input.previsaoDeTermino) updateData.previsaoDeTermino = new Date(input.previsaoDeTermino);

    const updated = await this.projectRepository.update(id, updateData);
    if (!updated) {
      throw new HttpException('Failed to update project', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return updated;
  }
}
