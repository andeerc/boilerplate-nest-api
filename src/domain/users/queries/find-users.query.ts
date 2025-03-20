import { DatabaseService, Filter } from '@/infrastructure/database/database.service';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class FindUsersQuery {
  constructor(public readonly filter: Filter) { }
}

@QueryHandler(FindUsersQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUsersQuery> {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  async execute(query: FindUsersQuery) {
    const users = await this.databaseService
      .applyFilter(query.filter, 'users')
      .select('id', 'name', 'email', 'metadata', 'created_at');

    return users;
  }
}
