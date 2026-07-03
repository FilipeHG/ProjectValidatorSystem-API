import { RiskCalculationService } from '../../src/domain/services/risk-calculation.service';
import { ProjectRisk } from '../../src/domain/enums/project-risk.enum';
import { describe, it, expect, beforeEach } from 'vitest';

describe('RiskCalculationService', () => {
  let service: RiskCalculationService;

  beforeEach(() => {
    service = new RiskCalculationService();
  });

  it('should return BAIXO for budget < 50000', () => {
    const result = service.calculateRisk(40000, new Date(), new Date());
    expect(result).toBe(ProjectRisk.BAIXO);
  });

  it('should return MEDIO for budget <= 500000', () => {
    const result = service.calculateRisk(300000, new Date(), new Date());
    expect(result).toBe(ProjectRisk.MEDIO);
  });

  it('should return ALTO for budget > 500000', () => {
    const result = service.calculateRisk(1000000, new Date(), new Date());
    expect(result).toBe(ProjectRisk.ALTO);
  });
});
