import { describe, it, expect } from 'vitest';
import { ProjectAnalysisPromptBuilder } from '../../src/application/ai/prompt-builder/project-analysis.prompt-builder';
import { Projeto } from '../../src/domain/entities/projeto.entity';
import { ProjectStatus } from '../../src/domain/enums/project-status.enum';
import { ProjectRisk } from '../../src/domain/enums/project-risk.enum';

describe('ProjectAnalysisPromptBuilder', () => {
  it('should build prompt correctly', () => {
    const builder = new ProjectAnalysisPromptBuilder();
    const projeto = new Projeto(
      'id',
      'Nome do Projeto',
      new Date('2026-01-01T00:00:00Z'),
      new Date('2026-06-01T00:00:00Z'),
      100000,
      'Descrição',
      ProjectStatus.EM_ANALISE,
      ProjectRisk.BAIXO,
      new Date(),
      new Date()
    );

    const prompt = builder.build(projeto);
    expect(prompt).toContain('Name: Nome do Projeto');
    expect(prompt).toContain('Budget: 100000');
    expect(prompt).toContain('Calculated Risk: Baixo');
    expect(prompt).toContain('Status: Em análise');
  });
});
