import { GoalsData, constantPriorities, constantStatuses } from "./GoalsData";
import s from "./Goals.module.scss";

export const STATUS_CLASSES: Record<string, string> = {
   [constantStatuses.completed]: s.statusCompleted,
   [constantStatuses.inProcess]: s.statusInProcess,
   [constantStatuses.awaiting]: s.statusAwaiting,
   [constantStatuses.abandoned]: s.statusAbandoned,
}
export const PRIORITY_CLASSES: Record<string, string> = {
   [constantPriorities.high]: s.priorityHigh,
   [constantPriorities.medium]: s.priorityMedium,
   [constantPriorities.low]: s.priorityLow,
}

export interface GoalStatItem {
   id: string;
   title: string;
   count: number;
}

export type goalStatCategory = Record<string, GoalStatItem>;

export const calculateAllProjectStats = () => {
   const allProjectsList = Object.values(GoalsData);
   const allGoals = allProjectsList.flatMap((proj) => Object.values(proj.content || {}));

   const awaitingGoals = allGoals.filter(g => g.status === constantStatuses.awaiting).length;
   const inProcessGoals = allGoals.filter(g => g.status === constantStatuses.inProcess).length;
   const completedGoals = allGoals.filter(g => g.status === constantStatuses.completed).length;
   const abandonedGoals = allGoals.filter(g => g.status === constantStatuses.abandoned).length;

   return {
      allProjectsCount: allProjectsList.length,
      awaitingGoals,
      inProcessGoals,
      completedGoals,
      abandonedGoals,
      totalActiveGoals: awaitingGoals + inProcessGoals + abandonedGoals,
   };
};

export const getGoalsStatsList = (): goalStatCategory => {
   const stats =  calculateAllProjectStats();
   const abandonedProjectsCount = stats.allProjectsCount - 1;

   const currentWeight =
      (stats.inProcessGoals * 2.58) + (stats.awaitingGoals * 1.24) +
      ((stats.abandonedGoals * 0.58) + (abandonedProjectsCount) * 0.16);

   const rawPriority = Math.max(1.0, 20.0 - currentWeight);
   const workPriority = parseFloat(rawPriority.toFixed(3));

   return {
      "all-projects": {
         id: "all-projects",
         title: "Всего кол-во проектов",
         count: stats.allProjectsCount,
      },
      "abandoned-projects": {
         id: "abandoned-projects",
         title: "Временно заброшенные проекты",
         count: abandonedProjectsCount,
      },
      "work-priority": {
         id: "work-priority",
         title: "Приоритет работы (повышается в случае простоя)",
         count: workPriority,
      },
      "all-goals": {
         id: "all-goals",
         title: "Всего целей (за исключением выполненных)",
         count: stats.totalActiveGoals,
      },
      "in-process-goals": {
         id: "in-process-goals",
         title: "Цели в процессе",
         count: stats.inProcessGoals,
      },
      "awaiting-goals": {
         id: "awaiting-goals",
         title: "Ожидают цели",
         count: stats.awaitingGoals,
      },
      "completed-goals": {
         id: "completed-goals",
         title: "Выполненные цели",
         count: stats.completedGoals,
      },
      "abandoned-goals": {
         id: "abandoned-goals",
         title: "Заброшенные цели",
         count: stats.abandonedGoals,
      },
   };
};