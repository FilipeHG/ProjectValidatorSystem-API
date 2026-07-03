import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAnalysisService } from '../../src/application/ai/services/ai-analysis.service';
import { AiProviderFactory } from '../../src/application/ai/factories/ai-provider.factory';
import { ProjectAnalysisPromptBuilder } from '../../src/application/ai/prompt-builder/project-analysis.prompt-builder';
import { Projeto } from '../../src/domain/entities/projeto.entity';
import { ProjectStatus } from '../../src/domain/enums/project-status.enum';
import { ProjectRisk } from '../../src/domain/enums/project-risk.enum';
import { AiProviderException } from '../../src/infrastructure/exceptions/infrastructure.exception';

describe('AiAnalysisService', () => {
  let service: AiAnalysisService;
  let mockFactory: AiProviderFactory;
  let mockPromptBuilder: ProjectAnalysisPromptBuilder;
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      analyzeProject: vi.fn()
    };

    mockFactory = {
      getProvider: vi.fn().mockReturnValue(mockProvider)
    } as any;

    mockPromptBuilder = {
      build: vi.fn().mockReturnValue('prompt')
    } as any;

    service = new AiAnalysisService(mockFactory, mockPromptBuilder);
  });

  const getMockProject = () => new Projeto(
    'id', 'nome', new Date(), new Date(), 1000, 'desc', ProjectStatus.EM_ANALISE, ProjectRisk.BAIXO, new Date(), new Date()
  );

  it('should return valid AiAnalysisResult', async () => {
    mockProvider.analyzeProject.mockResolvedValue({
      resumoDoProjeto: 'Valid',
      pontosDeAtencao: ['Ponto'],
      recomendacaoExecutiva: 'Valid'
    });

    const result = await service.generateAnalysis(getMockProject());
    expect(result.resumoDoProjeto).toBe('Valid');
  });

  it('should throw AiProviderException if validation fails', async () => {
    mockProvider.analyzeProject.mockResolvedValue({
      resumoDoProjeto: 123, // Invalid type
      pontosDeAtencao: ['Ponto'],
      recomendacaoExecutiva: 'Valid'
    });

    await expect(service.generateAnalysis(getMockProject()))
      .rejects.toThrowError(AiProviderException);
  });

  it('should handle non-Error objects correctly', async () => {
    mockProvider.analyzeProject.mockRejectedValue('String error');

    await expect(service.generateAnalysis(getMockProject()))
      .rejects.toBe('String error');
  });
});
