import { Projeto } from '../../domain/entities/projeto.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectAnalysisPromptBuilder {
  build(project: Projeto): string {
    return `
Analyze the following project and provide a structured JSON response.

Project Details:
Name: ${project.nome}
Status: ${project.status}
Budget: ${project.orcamentoTotal}
Start Date: ${project.dataDeInicio.toISOString()}
End Date: ${project.previsaoDeTermino.toISOString()}
Calculated Risk: ${project.riscoCalculado}
Description: ${project.descricao}

Required JSON format exactly as follows:
{
  "resumoDoProjeto": "A brief summary of the project",
  "pontosDeAtencao": ["Array of attention points or risks"],
  "recomendacaoExecutiva": "An executive recommendation based on the current state"
}
`;
  }
}
