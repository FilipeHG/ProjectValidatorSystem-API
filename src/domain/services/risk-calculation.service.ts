import { Injectable } from '@nestjs/common';
import { ProjectRisk } from '../enums/project-risk.enum';

@Injectable()
export class RiskCalculationService {
  calculateRisk(orcamentoTotal: number, dataDeInicio: Date, previsaoDeTermino: Date): ProjectRisk {
    const diffDays = (previsaoDeTermino.getTime() - dataDeInicio.getTime()) / (1000 * 60 * 60 * 24);
    const diffMonths = diffDays / 30.4166; // Average days in a month

    let budgetRisk = ProjectRisk.BAIXO;
    if (orcamentoTotal > 500000) {
      budgetRisk = ProjectRisk.ALTO;
    } else if (orcamentoTotal > 100000) {
      budgetRisk = ProjectRisk.MEDIO;
    }

    let timeRisk = ProjectRisk.BAIXO;
    if (diffMonths > 6) {
      timeRisk = ProjectRisk.ALTO;
    } else if (diffMonths > 3) {
      timeRisk = ProjectRisk.MEDIO;
    }

    const riskOrder = {
      [ProjectRisk.BAIXO]: 1,
      [ProjectRisk.MEDIO]: 2,
      [ProjectRisk.ALTO]: 3,
    };

    return riskOrder[budgetRisk] > riskOrder[timeRisk] ? budgetRisk : timeRisk;
  }
}
