import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: User;

    users_composite: Knex.CompositeTableType<
      User,
      Pick<User, 'id'> & Partial<Pick<User, 'created_at', 'updated_at'>>,
      Partial<Omit<User, 'id'>>
    >;
  }
}