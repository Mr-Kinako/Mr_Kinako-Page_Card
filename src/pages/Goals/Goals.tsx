import { CardContainer } from "@/components/UI-Kit/CardContainer";
import s from "./Goals.module.scss";
import { getGoalsStatsList, goalStatCategory } from "./GoalsUtils";
import { constantStatuses, GoalsData } from "./GoalsData";

interface GoalsProps {
   stats?: goalStatCategory;
}

export const Goals = ({ stats }: GoalsProps) => {
   const currentStats = stats || getGoalsStatsList();

   return (
      <div className={s["goals-page"]}>
         <CardContainer customClass={s["header-container"]}>
            <div className={s.headerInfo}>
               <h1 className={s.headerTitle}>Мои зафиксированные цели</h1>
               <div className={s.headerDesc}>
                  Данные тут могут быть не актуальны. <br />
                  Больше всего могут быть актуальными данные в другом блоке.
               </div>
            </div>

            <div className={s.headerStatsContainer}>
               <CardContainer customClass={s.editContainer}>
                  {Object.values(currentStats).map((item) => (
                     <div key={item.id} className={s.goalItem}>
                        <div className={s.overlay}></div>

                        <span className={s.count}>{item.count}</span>
                        <h5 className={s.title}>{item.title}</h5>

                        {item.id === "work-priority" && (
                           <span className={s.priorityDesc}>
                              высчитывается по формуле:
                              <br />
                              (inProcessGoals * 2.58) + (awaitingGoals * 1.08) +
                              ((abandonedGoals * 1.24) +
                              (abandonedProjectsCount) * 0.16) <br />
                              Math.max(1.0, 20.0 - currentWeight) <br />
                              parseFloat(rawPriority.toFixed(3))
                           </span>
                        )}
                     </div>
                  ))}
               </CardContainer>
            </div>
         </CardContainer>

         <CardContainer customClass={s["tasks-container"]}>
            <div className={s.tasksContentContainer}>
               {Object.entries(GoalsData).map(([projectKey, project]) => {
                  const tasks = Object.entries(project.content || {});
                  const activeGoalsCount = Object.values(
                     project.content || {},
                  ).filter(
                     (task) => task.status !== constantStatuses.completed,
                  ).length;
                  const goalsCount = activeGoalsCount ? activeGoalsCount : 0;

                  return (
                     <div key={projectKey} className={s.projectCard}>
                        <div className={s.projectHeaderTitle}>
                           <h3 className={s.projectTitle}>{project.title}</h3>
                           <CardContainer customClass={s.projectGoals}>
                              <span className={s.goals}>
                                 {goalsCount} целей
                              </span>
                           </CardContainer>
                        </div>
                        {project.description && (
                           <p className={s.projectDesc}>
                              {project.description}
                           </p>
                        )}

                        {tasks.length > 0 ? (
                           <ul className={s.taskList}>
                              {Object.entries(project.content || {}).map(
                                 ([taskKey, task]) => (
                                    <CardContainer key={taskKey}>
                                       <h4>{task.title}</h4>
                                       <p>{task.description}</p>

                                       <div className={s.taskMeta}>
                                          <span>{task.priority}</span>
                                          <span>{task.status}</span>
                                       </div>
                                    </CardContainer>
                                 ),
                              )}
                           </ul>
                        ) : (
                           <div className={s.emptyContentFallback}>
                              <span>
                                 Задачи для этого проекта пока не сформированы.
                              </span>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>
         </CardContainer>
      </div>
   );
};
