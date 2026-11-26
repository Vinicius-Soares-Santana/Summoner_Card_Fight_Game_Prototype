import { Route } from 'react-router-dom';
import WestCourtyard from './WestCourtyard';
import ProtectionOfferingRoom from './ProtectionOfferingRoom';
import Sanctuary from './Sanctuary';
import ChapelWing from './ChapelWing';
import FirstChapel from './FirstChapel';
import SecondChapel from './SecondChapel';
import ThirdChapel from './ThirdChapel';
import EastCourtyard from './EastCourtyard';
import WarOfferingRoom from './WarOfferingRoom';
import Kitchen from './Kitchen';
import Storeroom from './Storeroom';
import GuardCorridor from './GuardCorridor';
import CaptainOffice from './CaptainOffice';
import Armory from './Armory';
import ShieldRoom from './ShieldRoom';
import Antechamber from './Antechamber';
import PowerOfferingRoom from './PowerOfferingRoom';

import './TempleRoom.css';

export const templeRoutes = (
  <>
    <Route path="west-courtyard" element={<WestCourtyard />} />
    <Route path="protection-offering-room" element={<ProtectionOfferingRoom />} />
    <Route path="sanctuary" element={<Sanctuary />} />
    <Route path="chapels" element={<ChapelWing />} />
    <Route path="chapel-1" element={<FirstChapel />} />
    <Route path="chapel-2" element={<SecondChapel />} />
    <Route path="chapel-3" element={<ThirdChapel />} />
    <Route path="east-courtyard" element={<EastCourtyard />} />
    <Route path="war-offering-room" element={<WarOfferingRoom />} />
    <Route path="kitchen" element={<Kitchen />} />
    <Route path="storeroom" element={<Storeroom />} />
    <Route path="guard-corridor" element={<GuardCorridor />} />
    <Route path="captain-office" element={<CaptainOffice />} />
    <Route path="armory" element={<Armory />} />
    <Route path="shield-room" element={<ShieldRoom />} />
    <Route path="antechamber" element={<Antechamber />} />
    <Route path="power-offering-room" element={<PowerOfferingRoom />} />
  </>
);
