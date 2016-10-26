

export interface ActionArgumentInterface {
    x: number;
    y: number;
    face: string;
    valid: boolean;
}

export interface CommandInterface {
    action: string;
    arguments: ActionArgumentInterface;
    valid: boolean;
}