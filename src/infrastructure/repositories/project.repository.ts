import { Injectable, Inject } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { IProjectRepository } from '../../application/repositories/project.repository.interface';
import { Projeto } from '../../domain/entities/projeto.entity';
import { DATABASE_CONNECTION } from '../database/database.module';
import { projetos } from '../database/schema';
import { RepositoryException } from '../exceptions/infrastructure.exception';
import { ProjectStatus } from '../../domain/enums/project-status.enum';
import { ProjectRisk } from '../../domain/enums/project-risk.enum';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: PostgresJsDatabase<any>,
  ) {}

  private mapToEntity(row: any): Projeto {
    return new Projeto(
      row.id,
      row.nome,
      new Date(row.dataDeInicio),
      new Date(row.previsaoDeTermino),
      parseFloat(row.orcamentoTotal),
      row.descricao,
      row.status as ProjectStatus,
      row.riscoCalculado as ProjectRisk,
      new Date(row.dtCriacao),
      new Date(row.dtAtualizacao),
    );
  }

  async create(data: Omit<Projeto, 'id' | 'dtCriacao' | 'dtAtualizacao'>): Promise<Projeto> {
    try {
      const [inserted] = await this.db.insert(projetos).values({
        nome: data.nome,
        dataDeInicio: data.dataDeInicio.toISOString().split('T')[0],
        previsaoDeTermino: data.previsaoDeTermino.toISOString().split('T')[0],
        orcamentoTotal: data.orcamentoTotal.toString(),
        descricao: data.descricao,
        status: data.status,
        riscoCalculado: data.riscoCalculado,
      }).returning();
      
      return this.mapToEntity(inserted);
    } catch (error) {
      throw new RepositoryException(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async findAll(page: number, limit: number): Promise<{ data: Projeto[]; total: number }> {
    try {
      const offset = (page - 1) * limit;
      
      const rows = await this.db.select().from(projetos).limit(limit).offset(offset).orderBy(projetos.dtCriacao);
      const [{ count }] = await this.db.select({ count: sql<number>`count(*)` }).from(projetos);
      
      return {
        data: rows.map(r => this.mapToEntity(r)),
        total: Number(count),
      };
    } catch (error) {
      throw new RepositoryException(`Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async findById(id: string): Promise<Projeto | null> {
    try {
      const [row] = await this.db.select().from(projetos).where(eq(projetos.id, id));
      if (!row) return null;
      return this.mapToEntity(row);
    } catch (error) {
      throw new RepositoryException(`Failed to fetch project by id: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async update(id: string, data: Partial<Projeto>): Promise<Projeto | null> {
    try {
      const updateData: any = { ...data, dtAtualizacao: new Date() };
      
      if (data.dataDeInicio) updateData.dataDeInicio = data.dataDeInicio.toISOString().split('T')[0];
      if (data.previsaoDeTermino) updateData.previsaoDeTermino = data.previsaoDeTermino.toISOString().split('T')[0];
      if (data.orcamentoTotal !== undefined) updateData.orcamentoTotal = data.orcamentoTotal.toString();
      
      delete updateData.id;
      delete updateData.dtCriacao;

      const [updated] = await this.db.update(projetos).set(updateData).where(eq(projetos.id, id)).returning();
      
      if (!updated) return null;
      return this.mapToEntity(updated);
    } catch (error) {
      throw new RepositoryException(`Failed to update project: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.delete(projetos).where(eq(projetos.id, id));
    } catch (error) {
      throw new RepositoryException(`Failed to delete project: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }
}
