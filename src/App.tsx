import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Rules from '@/pages/Rules';
import { ListsCatalog, ListView } from '@/pages/Lists';
import SystemHalt from '@/pages/SystemHalt';
import styles from '@/App.module.scss';

function App() {
  return (
    <div className={styles.appWrapper}>
      <BrowserRouter>
        <Routes>
          {/* 1. Главная */}
          <Route path='/' element={<Home />} />
          
          {/* 2. Статические служебные роуты */}
          <Route path='/system/halt' element={<SystemHalt />} />
          
          {/* 3. Глобальные Списки */}
          <Route path='/lists' element={<ListsCatalog />} />
          <Route path='/lists/:listId' element={<ListView />} />

          {/* 3. Списки в контексте сервера */}
          <Route path='/:serverId/lists' element={<ListsCatalog />} />
          <Route path='/:serverId/lists/:listId' element={<ListView />} />

          {/* 4. Правила сервера */}
          <Route path='/:serverId/rules/:rulesCategory' element={<Rules />} />
          <Route path='/:serverId/rules/:rulesCategory/:ruleId' element={<Rules />} />
          
          {/* 5. Заглушка сервера */}
          <Route path='/:serverId' element={<SystemHalt />} />

          {/* 6. Фоллбэк */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;