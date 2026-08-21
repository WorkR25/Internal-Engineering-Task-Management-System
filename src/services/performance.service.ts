export interface IPerformanceService {
    getCurrentUserPerformance(userId : bigint): Promise<unknown>
    getCurrentUserTaskLevelPerformance(userId: bigint): Promise<unknown>
    getCurrentUserPerformanceTrend(): void
    getAllDevelopersPerformance(): void
    getDeveloperPerformance(): void
    getDeveloperTaskLevelPerformance(): void
    getDeveloperPerformanceTrend(): void
}

export class PerformanceService implements IPerformanceService {
    async getCurrentUserPerformance(userId: bigint): Promise<unknown> {
        return {
            developerId: userId.toString(),
            totalTasks: 10,
            completedTasks: 7,
            averageScore: 82,
            completionRate: 70
        };
    }

    async getCurrentUserTaskLevelPerformance(userId: bigint): Promise<unknown> {
        return [
            {
                developerId: userId.toString(),
                taskId: "1",
                score: 82
            },
            {
                developerId: userId.toString(),
                taskId: "2",
                score: 76
            }
        ];
    }

    getCurrentUserPerformanceTrend(): void {}

    getAllDevelopersPerformance(): void {}

    getDeveloperPerformance(): void {}

    getDeveloperTaskLevelPerformance(): void {}

    getDeveloperPerformanceTrend(): void {}
}