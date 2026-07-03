import { Injectable } from '@nestjs/common';
import { AiProvider } from '../contracts/ai-provider.interface';
import { AiAnalysisResult } from '../dto/ai-analysis-result.dto';

@Injectable()
export class MockAiProvider implements AiProvider {
  async analyzeProject(prompt: string): Promise<AiAnalysisResult> {
    return {
      resumoDoProjeto: 'Projeto de desenvolvimento corporativo.',
      pontosDeAtencao: [
        'Prazo elevado',
        'Dependência de recursos especializados'
      ],
      recomendacaoExecutiva: 'Prosseguir com monitoramento periódico.'
    };
  }
}
