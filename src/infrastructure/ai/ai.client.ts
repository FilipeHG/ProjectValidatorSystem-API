import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiProviderException } from '../exceptions/infrastructure.exception';

@Injectable()
export class AiClient {
  private readonly genAI: GoogleGenerativeAI;
  
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateStructuredResponse(prompt: string, schema: any): Promise<any> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        }
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return JSON.parse(text);
    } catch (error) {
      throw new AiProviderException(`AI request failed: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }
}
