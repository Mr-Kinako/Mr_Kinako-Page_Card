import type { TabType } from '@/constants/content';
import styles from './Tabs.module.scss';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const tabs: TabType[] = ['PC-Hardware', 'P-Games', 'Media'];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
