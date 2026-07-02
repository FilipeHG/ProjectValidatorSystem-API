# Project-ProjectValidatorSystem-OpenAI-Integration.md

# Objective

Add support for OpenAI GPT-4.1-mini as an alternative AI provider for the endpoint:

```http
GET /api/projects/{id}/ai-analysis
```

The architecture must allow runtime selection of the AI provider through environment variables without requiring code changes.

Supported providers:

- OpenAI GPT-4.1-mini
- Google Gemini
- Mock Provider (Development)

The existing Gemini implementation MUST remain fully functional.

The AI Provider must be selected only through configuration.

---

# Architecture Goal

Current Architecture

```text
Controller
    ↓
AiAnalysisService
    ↓
AiClient (Gemini)
```

Target Architecture

```text
Controller
    ↓
AiAnalysisService
    ↓
AiProvider
        ↓
        ├── GeminiAiProvider
        ├── OpenAiProvider
        └── MockAiProvider
```

The Controller and AiAnalysisService must never know which provider is being used.

Provider selection must be centralized.

---

# Environment Variables

Update .env.example

```env
AI_PROVIDER=mock

OPENAI_API_KEY=change-me
OPENAI_MODEL=gpt-4.1-mini

GEMINI_API_KEY=change-me
GEMINI_MODEL=gemini-2.0-flash
```

---

Example Development

```env
AI_PROVIDER=mock
```

---

Example OpenAI

```env
AI_PROVIDER=openai
OPENAI_MODEL=gpt-4.1-mini
```

---

Example Gemini

```env
AI_PROVIDER=gemini
GEMINI_MODEL=gemini-2.0-flash
```

---

# Folder Structure

Create:

```text
src/application/ai/

├── contracts/
│   └── ai-provider.interface.ts
│
├── providers/
│   ├── gemini-ai.provider.ts
│   ├── openai-ai.provider.ts
│   └── mock-ai.provider.ts
│
├── factories/
│   └── ai-provider.factory.ts
│
├── dto/
│   └── ai-analysis-result.dto.ts
│
└── services/
    └── ai-analysis.service.ts
```

---

# Step 1 - Create AI Result Contract

File

```text
src/application/ai/dto/ai-analysis-result.dto.ts
```

```ts
export interface AiAnalysisResult {
  resumoDoProjeto: string;
  pontosDeAtencao: string[];
  recomendacaoExecutiva: string;
}
```

---

# Step 2 - Create Provider Interface

File

```text
src/application/ai/contracts/ai-provider.interface.ts
```

```ts
import { Projeto } from '../../../domain/entities/projeto.entity';
import { AiAnalysisResult } from '../dto/ai-analysis-result.dto';

export interface AiProvider {
  analyzeProject(
    projeto: Projeto
  ): Promise<AiAnalysisResult>;
}
```

---

# Step 3 - Refactor Prompt Builder

Keep existing implementation.

File

```text
src/application/ai/prompt-builder/project-analysis-prompt.builder.ts
```

Output example:

```text
Analyze the project below.

Project Name:
{{nome}}

Description:
{{descricao}}

Budget:
{{orcamento}}

Status:
{{status}}

Risk:
{{risco}}

Provide:

1. Summary
2. Attention Points
3. Executive Recommendation

Return JSON only.
```

Prompt Builder remains provider agnostic.

---

# Step 4 - Create Mock Provider

File

```text
src/application/ai/providers/mock-ai.provider.ts
```

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockAiProvider {

  async analyzeProject() {

    return {
      resumoDoProjeto:
        'Projeto de desenvolvimento corporativo.',

      pontosDeAtencao: [
        'Prazo elevado',
        'Dependência de recursos especializados'
      ],

      recomendacaoExecutiva:
        'Prosseguir com monitoramento periódico.'
    };
  }
}
```

---

# Step 5 - Create OpenAI Provider

Install:

```bash
npm install openai
```

File

```text
src/application/ai/providers/openai-ai.provider.ts
```

```ts
import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAiProvider {

  private readonly client: OpenAI;

  constructor() {

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async analyzeProject(
    prompt: string
  ) {

    const response =
      await this.client.responses.create({

        model:
          process.env.OPENAI_MODEL ??
          'gpt-4.1-mini',

        input: prompt,

        text: {
          format: {
            type: 'json_object'
          }
        }
      });

    const content =
      response.output_text;

    return JSON.parse(content);
  }
}
```

---

# Step 6 - Create Gemini Provider

Move current Gemini implementation.

File

```text
src/application/ai/providers/gemini-ai.provider.ts
```

Responsibilities:

- Gemini SDK
- API communication
- JSON Mode
- Error handling

No business logic.

---

# Step 7 - Create Provider Factory

File

```text
src/application/ai/factories/ai-provider.factory.ts
```

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiProviderFactory {

  constructor(
    private readonly geminiProvider:
      GeminiAiProvider,

    private readonly openAiProvider:
      OpenAiProvider,

    private readonly mockProvider:
      MockAiProvider
  ) {}

  getProvider() {

    const provider =
      process.env.AI_PROVIDER?.toLowerCase();

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
```

---

# Step 8 - Refactor AiAnalysisService

File

```text
src/application/ai/services/ai-analysis.service.ts
```

Responsibilities:

```text
1. Load project
2. Build prompt
3. Resolve provider
4. Execute analysis
5. Validate response
6. Return DTO
```

Implementation

```ts
const provider =
  this.providerFactory.getProvider();

const result =
  await provider.analyzeProject(
    projeto
  );
```

---

# Step 9 - Response Validation

Install

```bash
npm install zod
```

File

```text
src/application/ai/schemas/ai-analysis.schema.ts
```

```ts
import { z } from 'zod';

export const AiAnalysisSchema =
  z.object({

    resumoDoProjeto:
      z.string(),

    pontosDeAtencao:
      z.array(z.string()),

    recomendacaoExecutiva:
      z.string()
  });
```

Validate before returning.

```ts
return AiAnalysisSchema.parse(
  result
);
```

---

# Step 10 - Dependency Injection

Update:

```text
src/application/ai/ai.module.ts
```

Register:

```ts
providers: [

  MockAiProvider,

  OpenAiProvider,

  GeminiAiProvider,

  AiProviderFactory,

  AiAnalysisService
]
```

---

# Step 11 - Swagger

No changes required.

Endpoint remains:

```http
GET /api/projects/{id}/ai-analysis
```

---

# Step 12 - Error Handling

Map provider errors.

OpenAI

```text
401
```

↓

```json
{
  "type": "ai-provider-error",
  "title": "AI Provider Failure"
}
```

---

Gemini

```text
429
```

↓

```json
{
  "type": "ai-provider-error",
  "title": "AI Quota Exceeded"
}
```

---

# Step 13 - Testing

Create tests:

```text
openai-ai.provider.spec.ts
gemini-ai.provider.spec.ts
mock-ai.provider.spec.ts
ai-provider.factory.spec.ts
ai-analysis.service.spec.ts
```

Validate:

```text
AI_PROVIDER=mock
```

↓

Uses MockAiProvider

---

```text
AI_PROVIDER=openai
```

↓

Uses OpenAiProvider

---

```text
AI_PROVIDER=gemini
```

↓

Uses GeminiAiProvider

---

# Acceptance Criteria

✓ AI provider selectable via .env

✓ No controller changes required

✓ No endpoint changes required

✓ OpenAI GPT-4.1-mini supported

✓ Gemini remains supported

✓ Mock provider available

✓ Provider switching requires only .env change

✓ Response validated through Zod

✓ Architecture remains compliant with ADR-006

✓ GET /api/projects/{id}/ai-analysis remains unchanged