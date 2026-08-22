export interface IPerformanceService {
    getCurrentUserPerformance(userId : bigint): Promise<unknown>
    getCurrentUserTaskLevelPerformance(userId: bigint): Promise<unknown>
    getCurrentUserPerformanceTrend(userId: bigint): Promise<unknown>
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

    async getCurrentUserPerformanceTrend(userId: bigint): Promise<unknown> {
        return {
            developerId: userId.toString(),
            trend: [
                {
                    period: "WEEK_1",
                    score: 72
                },
                {
                    period: "WEEK_2",
                    score: 78
                },
                {
                    period: "WEEK_3",
                    score: 82
                },
                {
                    period: "WEEK_4",
                    score: 86
                }
            ]
        };
    }

    getAllDevelopersPerformance(): void {}

    getDeveloperPerformance(): void {}

    getDeveloperTaskLevelPerformance(): void {}

    getDeveloperPerformanceTrend(): void {}
}