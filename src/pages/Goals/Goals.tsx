import { CardContainer } from "@/components/CardContainer";
import s from "./Goals.module.scss";
import { isProd } from "@/tumblers";

interface goalStatItem {
   id: string;
   title: string;
   count: number;
}
export const goalsStatsList: goalStatItem[] = [
   {
      id: "projects",
      title: "Кол-во проектов",
      count: 2,
   },
   {
      id: "allGoals",
      title: "Всего целей (за исключением выполненных)",
      count: 3,
   },
   {
      id: "workPriority",
      title: "Приоритет работы на данный момент",
      count: 4,
   },
   {
      id: "inProcess",
      title: "В процессе",
      count: 0,
   },
   {
      id: "awaiting",
      title: "Ожидают",
      count: 3,
   },
   {
      id: "completed",
      title: "Выполнены",
      count: 0,
   },
   {
      id: "abandoned",
      title: "Заброшены",
      count: 0,
   },
];
interface GoalsProps {
   stats: goalStatItem[];
}

export const Goals = ({ stats }: GoalsProps) => {
   let hiddenTextStyle = 0;
   if (isProd) {
      hiddenTextStyle = 0;
   }

   return (
      <div className={s["goals-page"]}>
         <div className={s["header-container"]}>
            <div className={s.headerInfo}>
               <h1 className={s.headerTitle}>Мои зафиксированные цели</h1>
               <div className={s.headerDesc}>
                  Данные тут могут быть не актуальны. <br />
                  Больше всего могут быть актуальными данные в другом блоке.
               </div>
            </div>

            <div className={s.headerStatsContainer}>
               <CardContainer customClass={s.editContainer}>
                  {stats.map((item) => (
                     <div key={item.id} className={s.goalItem}>
                        <div className={s.overlay}></div>
                        <span className={s.count}>{item.count}</span>
                        <h5 className={s.title}>{item.title}</h5>
                     </div>
                  ))}
               </CardContainer>
            </div>
         </div>

         <div className={`${s["tasks-container"]} ${isProd ? s.hidden : null}`}>
            <span style={{ opacity: hiddenTextStyle }}>
               Молодцы, ваша внимательность очень хороша. Однако не знаю что
               даст вам этот блок, вы увидите лишь сырую заготовку..
            </span>
            <ul>
               <li>
                  <h4>Задача #1</h4>
                  <p>description</p>
               </li>
            </ul>
         </div>
      </div>
   );
};
