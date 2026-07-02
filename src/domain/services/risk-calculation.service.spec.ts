import { describe, it, expect, beforeEach } from 'vitest';
import { RiskCalculationService } from './risk-calculation.service';
import { ProjectRisk } from '../enums/project-risk.enum';

describe('RiskCalculationService', () => {
  let service: RiskCalculationService;

  beforeEach(() => {
    service = new RiskCalculationService();
  });

  it('1. Baixo risco — orçamento baixo + prazo até 3 meses', () => {
    const risk = service.calculateRisk(100000, new Date('2026-01-01'), new Date('2026-03-31'));
    expect(risk).toBe(ProjectRisk.BAIXO);
  });

  it('2. Baixo risco — orçamento pequeno + prazo curto', () => {
    const risk = service.calculateRisk(50000, new Date('2026-02-01'), new Date('2026-04-15'));
    expect(risk).toBe(ProjectRisk.BAIXO);
  });

  it('3. Médio risco — orçamento médio + prazo curto', () => {
    const risk = service.calculateRisk(250000, new Date('2026-01-01'), new Date('2026-03-01'));
    expect(risk).toBe(ProjectRisk.MEDIO);
  });

  it('4. Médio risco — orçamento baixo + prazo entre 3 e 6 meses', () => {
    const risk = service.calculateRisk(80000, new Date('2026-01-01'), new Date('2026-06-01'));
    expect(risk).toBe(ProjectRisk.MEDIO);
  });

  it('5. Médio risco — limite superior de orçamento', () => {
    const risk = service.calculateRisk(500000, new Date('2026-01-01'), new Date('2026-03-15'));
    expect(risk).toBe(ProjectRisk.MEDIO);
  });

  it('6. Alto risco — orçamento acima de 500 mil', () => {
    const risk = service.calculateRisk(750000, new Date('2026-01-01'), new Date('2026-03-01'));
    expect(risk).toBe(ProjectRisk.ALTO);
  });

  it('7. Alto risco — prazo superior a 6 meses', () => {
    const risk = service.calculateRisk(90000, new Date('2026-01-01'), new Date('2026-08-01'));
    expect(risk).toBe(ProjectRisk.ALTO);
  });

  it('8. Alto risco — maior risco prevalece', () => {
    const risk = service.calculateRisk(300000, new Date('2026-01-01'), new Date('2026-08-01'));
    expect(risk).toBe(ProjectRisk.ALTO);
  });

  it('9. Alto risco — orçamento alto + prazo longo', () => {
    const risk = service.calculateRisk(1200000, new Date('2026-01-01'), new Date('2026-12-31'));
    expect(risk).toBe(ProjectRisk.ALTO);
  });

  it('10. Médio risco — orçamento mínimo da faixa média', () => {
    const risk = service.calculateRisk(100001, new Date('2026-01-01'), new Date('2026-03-31'));
    expect(risk).toBe(ProjectRisk.MEDIO);
  });
});
