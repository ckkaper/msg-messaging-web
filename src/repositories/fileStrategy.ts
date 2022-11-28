import Entity from './Entities/entity';
import IRepositoryStrategy from './interfaces/IRepositoryStrategy';
import * as utils from './utils/fileReaderWrapper';

class FileStrategy<T extends Entity> implements IRepositoryStrategy<T> {
  private filePath: string;

  private fileJsonData: Array<any>;

  /**
   * Creates a FileStrategy instance
   * @param filePath
   */
  constructor(filePath: string) {
    this.filePath = filePath;
    this.fileJsonData = utils.readJsonFromFile(this.filePath);
  }

  /**
   * Adds an entity
   * @param {T extends Entity} entity
   * @returns {boolean} result of the operation
   */
  public add(entity: T): boolean {
    this.fileJsonData.push(entity);
    return this.updateFile();
  }

  /**
   * Returns the list of all entities located in a file
   * @returns {Array<T>}  all entities
   */
  public list(): Array<T> {
    try {
      return this.fileJsonData;
    } catch (err) {
      console.log('internal server error');
      throw new Error('Unable to enumerate users');
    }
  }

  /**
   * retrieves the entity with the specified id from the file storage
   * @param {string} id
   * @returns {T} entity
   */
  public get(id: string): T {
    try {
      return this.fileJsonData.find((entity: T) => entity.id == id);
    } catch (err) {
      console.log('Failed to get entity');
      throw new Error('Unable to get entity');
    }
  }

  /**
   * removes an entity from the file storage
   * @param {string} id identifier of the entity to be removed
   * @returns {boolean} result of the operation
   */
  public remove(id: string): boolean {
    try {
      const index = this.fileJsonData.findIndex(
        (entity: T) => (entity.id = id)
      );
      console.log('index ' + index);
      this.fileJsonData.splice(index, 1);
      console.log(this.fileJsonData);
      return this.updateFile();
    } catch (err) {
      console.log('Unable to remove entity ');
      throw new Error('unable to remove entity');
    }
  }

  /**
   * updates an exhisting entity with a new entity
   * @param {T} entity
   */
  public update(entity: T): T {
    try {
      const index = this.fileJsonData.findIndex((fileEntity: T) => {
        fileEntity.id == entity.id;
      });
      this.fileJsonData.splice(index, 1);
      this.fileJsonData.push(entity);
      this.updateFile();
      return entity;
    } catch (err) {
      console.log('Unable to update file');
      throw new Error('Unable to return entity');
    }
  }

  /**
   * Generic method to replace the previous file contents
   * with new ones
   * @param newContent
   */
  private updateFile(): boolean {
    try {
      utils.writeFile(this.filePath, this.fileJsonData.toString());
      return true;
    } catch (err) {
      console.log(err);
      throw new Error('Unable to replace file:' + err);
    }
  }
}

export { FileStrategy };
