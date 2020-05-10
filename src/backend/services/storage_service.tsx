import { Service } from '@kira/instantiation';
import { ApplicationStorage } from '@kira/std';

type LocalDict = {
  auth: Object;
};

@Service()
export class StorageService {
  public static readonly ctor_name = Symbol('StorageService');

  public local = new ApplicationStorage<LocalDict>('local', '__kira__');
  public session = new ApplicationStorage('session', '__kira__');

  constructor() {
    // Empty
  }
}
