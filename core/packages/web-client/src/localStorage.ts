
export default class LocalStorage {


    saveNeededState = (state) => {
        this.saveState({
            environments: {
                selected: state.environments.selected
            }
        });
    }

    loadState = () => {
        try {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    };

    saveState = (state: any) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        } catch {
            // ignore write errors
        }
    };
}


