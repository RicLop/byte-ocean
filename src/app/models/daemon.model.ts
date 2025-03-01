export interface Daemon {
    id: number;
    life: number;
    resource: string;
    efficiency: number;
    cycleTime: number;
    progress: number;
    isRunning: boolean;
    isPaused: boolean;
}