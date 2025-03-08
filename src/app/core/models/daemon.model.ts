export interface Daemon {
    id: number;
    life: number;
    efficiency: number;
    cycleTime: number;
    progress: number;
    isRunning: boolean;
    isPaused: boolean;
}