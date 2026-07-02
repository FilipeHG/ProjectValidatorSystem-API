import { Injectable, Inject } from '@nestjs/common';
import { PROJECT_REPOSITORY, IProjectRepository } from '../repositories/project.repository.interface';
import { Projeto } from '../../domain/entities/projeto.entity';
import { RiskCalculationService } from '../../domain/services/risk-calculation.service';
import { ProjectStatus } from '../../domain/enums/project-status.enum';

export interface CreateProjectInput {
  nome: string;
  dataDeInicio: string;
  previsaoDeTermino: string;
  orcamentoTotal: number;
  descricao: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    private readonly riskCalculationService: RiskCalculationService,
  ) {}

  async execute(input: CreateProjectInput): Promise<Projeto> {
    const dataDeInicio = new Date(input.dataDeInicio);
    const previsaoDeTermino = new Date(input.previsaoDeTermino);
    
    const riscoCalculado = this.riskCalculationService.calculateRisk(
      input.orcamentoTotal,
      dataDeInicio,
      previsaoDeTermino,
    );

    const projetoData = {
      nome: input.nome,
      dataDeInicio,
      previsaoDeTermino,
      orcamentoTotal: input.orcamentoTotal,
      descricao: input.descricao,
      status: ProjectStatus.EM_ANALISE,
      riscoCalculado,
    };

    return this.projectRepository.create(projetoData as Omit<Projeto, 'id' | 'dtCriacao' | 'dtAtualizacao'>);
  }
}
