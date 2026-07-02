import { Injectable } from '@nestjs/common';
import { GeminiAiProvider } from '../providers/gemini-ai.provider';
import { OpenAiProvider } from '../providers/openai-ai.provider';
import { MockAiProvider } from '../providers/mock-ai.provider';

@Injectable()
export class AiProviderFactory {
  constructor(
    private readonly geminiProvider: GeminiAiProvider,
    private readonly openAiProvider: OpenAiProvider,
    private readonly mockProvider: MockAiProvider
  ) {}

  getProvider() {
    const provider = process.env.AI_PROVIDER?.toLowerCase();

    switch(provider) {
      case 'openai':
        return this.openAiProvider;
      case 'gemini':
        return this.geminiProvider;
      default:
        return this.mockProvider;
    }
  }
}
