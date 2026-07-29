import { CardContainer } from "@/components/UI-Kit/CardContainer";
import s from "./Goals.module.scss";
import {
   getGoalsStatsList,
   goalStatCategory,
   PRIORITY_CLASSES,
   STATUS_CLASSES,
} from "./GoalsUtils";
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
                        <div className={s.projectInfoContainer}>
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
                     </div>

                     {tasks.length > 0 ? (
                        <ul className={s.taskList}>
                           {Object.entries(project.content || {}).map(
                              ([taskKey, task]) => (
                                 <CardContainer
                                    key={taskKey}
                                    customClass={s.contentContainer}
                                 >
                                    <h4 className={s.taskTitle}>
                                       {task.title}
                                    </h4>
                                    <p className={s.taskDesc}>
                                       {task.description}
                                    </p>

                                    <div className={s.taskMeta}>
                                       <CardContainer
                                          customClass={`${s.taskStatus} ${s.metaItem} ${STATUS_CLASSES[task.status] || ""}`}
                                       >
                                          {task.status}
                                       </CardContainer>
                                       <CardContainer
                                          customClass={`${s.taskPriority} ${s.metaItem} ${PRIORITY_CLASSES[task.priority] || ""}`}
                                       >
                                          {task.priority}
                                       </CardContainer>
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
         </CardContainer>
      </div>
   );
};
