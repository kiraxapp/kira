import { Service } from '@kira/instantiation';
import { new_application_state, FlowState } from '@kira/application-state';
import { Timer } from '@kira/std';

interface Entries {
  id: string;
  name: string;
  linkTo: string;
}

export type ProjectRepresentation = {
  entries: Entries[];
  selected_id: string;
};

@Service()
export class ProjectControllerService {
  public static readonly ctor_name = Symbol('ProjectControllerService');

  public readonly loaded_projects = new_application_state<ProjectRepresentation>({
    selected_id: '',
    entries: [],
  });

  constructor() {
    // Empty
  }

  public fetch_entires(): () => void {
    if (this.loaded_projects.flow_state === FlowState.UNSET) {
      this.loaded_projects.in_flow(FlowState.PENDING);
    }

    const disposer = Timer.wait(() => {
      this.loaded_projects.mutate((data) => {
        const old_state = data.extract();
        const entries = [
          { id: '0', name: 'string 0', linkTo: 'string' },
          { id: '1', name: 'string 1', linkTo: 'string' },
          { id: '2', name: 'string 2', linkTo: 'string' },
          { id: '3', name: 'string 2', linkTo: 'string' },
        ];

        return {
          entries,
          selected_id: old_state.selected_id ? old_state.selected_id : entries[0].id,
        };
      });
    }, 500);

    return () => {
      disposer();
    };
  }
}
