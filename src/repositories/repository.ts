import IRepositoryStrategy from './interfaces/IRepositoryStrategy';

abstract class Repository<T> {
  protected strategy: IRepositoryStrategy<T>;

  constructor(strategy: IRepositoryStrategy<T>) {
    this.strategy = strategy;
  }

  public init(strategy: IRepositoryStrategy<T>): void {
    this.strategy = strategy;
  }

  public list(): Array<T> {
    return this.strategy.list();
  }

  public add(entity: T): boolean {
    return this.strategy.add(entity);
  }

  public update(entity: T): T {
    return this.strategy.update(entity);
  }

  public remove(id: string): boolean {
    return this.strategy.remove(id);
  }
}

export default Repository;
