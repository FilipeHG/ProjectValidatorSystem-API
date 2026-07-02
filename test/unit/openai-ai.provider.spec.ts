import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenAiProvider } from '../../src/application/ai/providers/openai-ai.provider';
import { AiProviderException } from '../../src/infrastructure/exceptions/infrastructure.exception';
import OpenAI from 'openai';

vi.mock('openai');

describe('OpenAiProvider', () => {
  let provider: OpenAiProvider;
  let mockCreate: any;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'test-key';
    
    mockCreate = vi.fn();
    (OpenAI as any).mockImplementation(function() {
      return {
        chat: {
          completions: {
            create: mockCreate
          }
        }
      };
    });
    
    provider = new OpenAiProvider();
  });

  it('should parse content correctly', async () => {
    mockCreate.mockResolvedValue({
      choices: [{
        message: {
          content: JSON.stringify({
            resumoDoProjeto: 'Resumo',
            pontosDeAtencao: ['Ponto 1'],
            recomendacaoExecutiva: 'Recomendação'
          })
        }
      }]
    });

    const result = await provider.analyzeProject('prompt');
    expect(result.resumoDoProjeto).toBe('Resumo');
  });

  it('should map 401 error to AiProviderException', async () => {
    mockCreate.mockRejectedValue({ status: 401, message: 'Invalid API Key' });

    await expect(provider.analyzeProject('prompt'))
      .rejects.toThrowError(new AiProviderException('AI Provider Failure'));
  });

  it('should map unknown errors', async () => {
    mockCreate.mockRejectedValue(new Error('Unknown error'));

    await expect(provider.analyzeProject('prompt'))
      .rejects.toThrowError(new AiProviderException('AI request failed: Unknown error'));
  });

  it('should throw error if response is empty', async () => {
    mockCreate.mockResolvedValue({
      choices: [{
        message: { content: '' }
      }]
    });

    await expect(provider.analyzeProject('prompt'))
      .rejects.toThrowError(new AiProviderException('AI request failed: Empty response from OpenAI'));
  });
});
