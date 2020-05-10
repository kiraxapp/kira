import { Instantiation } from '@kira/instantiation';
import { ProjectControllerService } from './controllers/project_controller_service';

export const Backend = new (class Backend {
  public readonly version = '0.0.1';
  public get projectControllerService(): ProjectControllerService {
    return Instantiation.resolve(ProjectControllerService);
  }
})();
