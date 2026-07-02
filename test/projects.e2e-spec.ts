import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/presentation/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from '../src/presentation/filters/global-exception.filter';

describe('ProjectsController Validation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('11. Inválido — orçamento zero', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Inválido Orçamento Zero',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: 0,
      descricao: 'Projeto inválido porque o orçamento deve ser maior que zero.',
    });
    expect(res.status).toBe(400);
  });

  it('12. Inválido — orçamento negativo', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Inválido Orçamento Negativo',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: -5000,
      descricao: 'Projeto inválido porque orçamento negativo não é permitido.',
    });
    expect(res.status).toBe(400);
  });

  it('13. Inválido — previsão antes da data de início', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Inválido Datas',
      dataDeInicio: '2026-06-01',
      previsaoDeTermino: '2026-03-01',
      orcamentoTotal: 100000,
      descricao: 'Projeto inválido porque a previsão de término é anterior à data de início.',
    });
    expect(res.status).toBe(400);
  });

  it('14. Inválido — cliente tentando enviar status e risco', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Inválido Campos Internos',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: 100000,
      descricao: 'Projeto inválido porque o cliente está tentando enviar campos controlados pelo sistema.',
      status: 'Encerrado',
      riscoCalculado: 'Alto',
    });
    expect(res.status).toBe(400);
  });

  it('15. Nome vazio', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: '',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: 100000,
      descricao: 'Nome vazio.',
    });
    expect(res.status).toBe(400);
  });

  it('16. Descrição vazia', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Sem Descrição',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: 100000,
      descricao: '',
    });
    expect(res.status).toBe(400);
  });

  it('17. Data inválida', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Data Inválida',
      dataDeInicio: '31/01/2026',
      previsaoDeTermino: '31/03/2026',
      orcamentoTotal: 100000,
      descricao: 'Formato de data inválido.',
    });
    expect(res.status).toBe(400);
  });

  it('18. Orçamento como string', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Orçamento String',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: '100000',
      descricao: 'Orçamento enviado como string.',
    });
    expect(res.status).toBe(400);
  });

  it('19. Campo obrigatório ausente', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Sem Descrição',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-03-31',
      orcamentoTotal: 100000,
    });
    expect(res.status).toBe(400);
  });

  it('20. Prazo exatamente 6 meses', async () => {
    const res = await request(app.getHttpServer()).post('/projects').send({
      nome: 'Projeto Limite Exato Seis Meses',
      dataDeInicio: '2026-01-01',
      previsaoDeTermino: '2026-07-01',
      orcamentoTotal: 50000,
      descricao: 'Projeto exatamente com seis meses de duração.',
    });
    // Conforme minha justificativa no plano, isso retorna 201 porque 6 meses é válido (Risco: Médio).
    // O banco de dados vai persistir, então ele deve retornar 201 Created.
    // Se estourar 400 por outra razão (ou se de fato fosse a regra), capturaríamos.
    expect(res.status).toBe(201);
  });
});
