import { useState } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Root from './assets/Containers/Root';
import MainMenu from './assets/Containers/MainMenu';
import Arena from './assets/Containers/Arena';
import Stage1Main from './assets/Containers/WorldContainers/Stage1/Stage1Main';
import CastleFieldsLeft1 from './assets/Containers/WorldContainers/Stage1/CastleFieldsLeft1';
import CastleFieldsLeft2 from './assets/Containers/WorldContainers/Stage1/CastleFieldsLeft2';
import CastleFieldsRight1 from './assets/Containers/WorldContainers/Stage1/CastleFieldsRight1';
import Maze from './assets/Containers/WorldContainers/Stage1/Maze';
import Stage1 from './assets/Containers/WorldContainers/Stage1/Stage1';
import Stage2 from './assets/Containers/WorldContainers/Stage2/Stage2';
import SelectCreaturesScreen from './assets/Containers/SelectCreaturesScreen';
import Shop from './assets/Containers/Shop';
import PlayerUDI from './assets/Containers/PlayerUDI';
import './App.css';
import './assets/Containers/WorldContainers/SceneGrid.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<MainMenu />} />
      <Route path="game" element={<PlayerUDI />}>

        <Route path="stage1" element={<Stage1 />} >
          <Route index element={<Stage1Main />} />
          <Route path="castlefieldsright1" element={<CastleFieldsRight1 />} />
          <Route path="castlefieldsleft1" element={<CastleFieldsLeft1 />} />
          <Route path="castlefieldsleft2" element={<CastleFieldsLeft2 />} />
          <Route path="maze" element={<Maze />} />
        </Route>

        <Route path="stage2" element={<Stage2 />} >

        </Route>

      </Route>
      <Route path="arena" element={<Arena />} />
      <Route path="selectcreatures" element={<SelectCreaturesScreen />} />
      <Route path="shop" element={<Shop />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
