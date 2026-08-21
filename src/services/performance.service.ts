export interface IPerformanceService {
    getCurrentUserPerformance(): void
    getCurrentUserTaskLevelPerformance(): void
    getCurrentUserPerformanceTrend(): void
    getAllDevelopersPerformance(): Promise<DeveloperPerformance[]>;
    getDeveloperPerformance(): void
    getDeveloperTaskLevelPerformance(): void
    getDeveloperPerformanceTrend(): void
}
export interface DeveloperPerformance {developerId: number;developerName: string;totalScore: number;performancePercentage: number;}

export class PerformanceService implements IPerformanceService {
    getCurrentUserPerformance(): void {}

    getCurrentUserTaskLevelPerformance(): void {}

    getCurrentUserPerformanceTrend(): void {}

    async getAllDevelopersPerformance(): Promise<DeveloperPerformance[]> {
        const developers = [
            {
                developerId: 1,
                developerName: "Developer One",
                requirementAnalysisScore: 8,
                codeQualityScore: 9,
                codeCorrectnessScore: 9,
                testingScore: 8,
                deliveryTimingScore: 9,
                prCommitQualityScore: 8,
            },
            {
                developerId: 2,
                developerName: "Developer Two",
                requirementAnalysisScore: 9,
                codeQualityScore: 8,
                codeCorrectnessScore: 8,
                testingScore: 9,
                deliveryTimingScore: 8,
                prCommitQualityScore: 9,
            },
            {
                developerId: 3,
                developerName: "Developer Three",
                requirementAnalysisScore: 7,
                codeQualityScore: 8,
                codeCorrectnessScore: 8,
                testingScore: 7,
                deliveryTimingScore: 8,
                prCommitQualityScore: 7,
            },
        ];

        return developers.map((developer) => {
            const totalScore =
                developer.requirementAnalysisScore +
                developer.codeQualityScore +
                developer.codeCorrectnessScore +
                developer.testingScore +
                developer.deliveryTimingScore +
                developer.prCommitQualityScore;

            const performancePercentage =
                (totalScore / 60) * 100;

            return {
                developerId: developer.developerId,
                developerName: developer.developerName,
                totalScore,
                performancePercentage: Number(
                    performancePercentage.toFixed(2)
                ),
            };
        });
    }

    getDeveloperPerformance(): void {}

    getDeveloperTaskLevelPerformance(): void {}

    getDeveloperPerformanceTrend(): void {}
}