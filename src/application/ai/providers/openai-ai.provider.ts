import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { AiProvider } from '../contracts/ai-provider.interface';
import { AiAnalysisResult } from '../dto/ai-analysis-result.dto';
import { AiProviderException } from '../../../infrastructure/exceptions/infrastructure.exception';

@Injectable()
export class OpenAiProvider implements AiProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async analyzeProject(prompt: string): Promise<AiAnalysisResult> {
    try {
      const response = await this.client.chat.completions.create({
        model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      return JSON.parse(content);
    } catch (error: any) {
      if (error.status === 401) {
        throw new AiProviderException('AI Provider Failure');
      }
      throw new AiProviderException(`AI request failed: ${error.message}`);
    }
  }
}
