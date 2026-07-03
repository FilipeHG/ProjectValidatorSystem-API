import { ProjectStatus } from '../enums/project-status.enum';
import { ProjectRisk } from '../enums/project-risk.enum';

export class Projeto {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly dataDeInicio: Date,
    public readonly previsaoDeTermino: Date,
    public readonly orcamentoTotal: number,
    public readonly descricao: string,
    public readonly status: ProjectStatus,
    public readonly riscoCalculado: ProjectRisk,
    public readonly dtCriacao: Date,
    public readonly dtAtualizacao: Date,
  ) {}
}
