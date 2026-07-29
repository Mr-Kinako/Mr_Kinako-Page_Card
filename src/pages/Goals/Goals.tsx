import { CardContainer } from "@/components/UI-Kit/CardContainer";
import s from "./Goals.module.scss";
import {
   getGoalsStatsList,
   PRIORITY_CLASSES,
   STATUS_CLASSES,
} from "./GoalsUtils";
import { constantStatuses, GoalsData, goalStatCategory } from "./GoalsData";
import { useState } from "react";

interface GoalsProps {
   stats?: goalStatCategory;
}

export const Goals = ({ stats }: GoalsProps) => {
   const currentStats = stats || getGoalsStatsList();
   const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

   return (
      <div className={s["goals-page"]}>
         {isPriorityModalOpen && (
            <div
               className={s.modalOverlay}
               onClick={() => setIsPriorityModalOpen(false)}
            >
               <CardContainer
                  customClass={s.modalContent}
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className={s.modalHeader}>
                     <h3>Формула расчёта приоритета</h3>
                     <button
                        className={s.closeBtn}
                        onClick={() => setIsPriorityModalOpen(false)}
                     >
                        ⨉
                     </button>
                  </div>

                  <div className={s.modalBody}>
                     <p>
                        Приоритет находится в жёстком диапазоне от{" "}
                        <strong>1.000</strong> (высокий) до{" "}
                        <strong>40.000</strong> (низкий).
                     </p>
                     <ul>
                        <li>
                           <strong>Backlog Score:</strong> Учитывает заброшенные
                           и ожидающие задачи.
                        </li>
                        <li>
                           <strong>Critical Anomalies:</strong> заброшенные
                           задачи с высоким приоритетом/средним приоритетом
                           сильно снижают число.
                        </li>
                        <li>
                           <strong>Abstraction parameters:</strong> longtime,
                           deadline, moral и myself price.
                        </li>
                     </ul>
                     <p className={s.modalNote}>
                        Обновляется автоматически каждые 24 часа.
                     </p>
                  </div>
               </CardContainer>
            </div>
         )}

         <CardContainer customClass={s["header-container"]}>
            <div className={s.headerInfo}>
               <h1 className={s.headerTitle}>Мои зафиксированные цели</h1>
               <div className={s.headerDesc}>
                  Тут находиться общий свод данных, в виде количества чего-то
                  конкретного.
               </div>
            </div>

            <div className={s.headerStatsContainer}>
               <CardContainer customClass={s.editContainer}>
                  {Object.values(currentStats).map((item) => {
                     const isPriorityCard = item.id === "work-priority";

                     return (
                        <div
                           key={item.id}
                           className={`${s.goalItem} ${isPriorityCard ? s.clickable : ""}`}
                           onClick={() =>
                              isPriorityCard && setIsPriorityModalOpen(true)
                           }
                        >
                           <div className={s.overlay}></div>

                           <span className={s.count}>{item.count}</span>
                           <h5 className={s.title}>{item.title}</h5>
                        </div>
                     );
                  })}
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
                                    <div className={s.taskInfoContainer}>
                                       <h4 className={s.taskTitle}>
                                          {task.title}
                                       </h4>
                                       <p className={s.taskDesc}>
                                          {task.description}
                                       </p>
                                    </div>

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
