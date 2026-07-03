import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProvider } from '../contracts/ai-provider.interface';
import { AiAnalysisResult } from '../dto/ai-analysis-result.dto';
import { AiProviderException } from '../../../infrastructure/exceptions/infrastructure.exception';

@Injectable()
export class GeminiAiProvider implements AiProvider {
  private readonly genAI: GoogleGenerativeAI;
  
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyzeProject(prompt: string): Promise<AiAnalysisResult> {
    try {
      const modelName = this.configService.get<string>('GEMINI_MODEL') || "gemini-2.0-flash";
      const model = this.genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
        }
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return JSON.parse(text);
    } catch (error: any) {
      if (error.status === 429) {
        throw new AiProviderException('AI Quota Exceeded');
      }
      throw new AiProviderException(`AI request failed: ${error.message}`);
    }
  }
}
