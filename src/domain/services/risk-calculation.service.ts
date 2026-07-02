import { Injectable } from '@nestjs/common';
import { ProjectRisk } from '../enums/project-risk.enum';

@Injectable()
export class RiskCalculationService {
  calculateRisk(orcamentoTotal: number, dataDeInicio: Date, previsaoDeTermino: Date): ProjectRisk {
    // Basic risk calculation based on budget
    if (orcamentoTotal < 50000) {
      return ProjectRisk.BAIXO;
    }
    
    if (orcamentoTotal <= 500000) {
      return ProjectRisk.MEDIO;
    }
    
    return ProjectRisk.ALTO;
  }
}
