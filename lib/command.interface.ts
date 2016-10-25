

export interface ActionArgumentInterface {
    x: number;
    y: number;
    face: string;
}

export interface CommandInterface {
    action: string;
    arguments: ActionArgumentInterface;
}