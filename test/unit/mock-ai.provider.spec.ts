import { describe, it, expect } from 'vitest';
import { MockAiProvider } from '../../src/application/ai/providers/mock-ai.provider';

describe('MockAiProvider', () => {
  it('should return mock result', async () => {
    const provider = new MockAiProvider();
    const result = await provider.analyzeProject('prompt');
    
    expect(result.resumoDoProjeto).toBe('Projeto de desenvolvimento corporativo.');
    expect(result.pontosDeAtencao.length).toBe(2);
    expect(result.recomendacaoExecutiva).toBe('Prosseguir com monitoramento periódico.');
  });
});
