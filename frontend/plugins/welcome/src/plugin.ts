import { createPlugin } from '@backstage/core';
//import WelcomePage from './components/WelcomePage';
// import WatchVideo from './components/WatchVideo'
import Employee from './components/Employee';
import Drug from './components/Drug'
import Patient from './components/Patient'
import Diagnosis from './components/Diagnosis'
import Disease from './components/Disease'
import Login from './components/SignIn/Login'
import Area from './components/Area';
import SearchEmployee from './components/Search Employee';
import SearchPatient from './components/Search Patient';
<<<<<<< HEAD
import SearchDisease from './components/Search Disease';
=======
import SearchDiagnosis from './components/Search Diagnosis';
>>>>>>> c57fb83 (เพิ่มโค้ด Component ชื่อ Search Diagnosis ของระบบค้นหาการวินิจฉัยโรคติดต่อ - close #247)

export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/employee', Employee);
    router.registerRoute('/searchemployee', SearchEmployee);
//    router.registerRoute('/', WelcomePage);
//    router.registerRoute('/watch_video', WatchVideo);
    router.registerRoute('/', Login);
    router.registerRoute('/drug', Drug);
    router.registerRoute('/patient', Patient);
    router.registerRoute('searchpatient', SearchPatient);
    router.registerRoute('/diagnosis', Diagnosis);
    router.registerRoute('searchdiagnosis', SearchDiagnosis);
    router.registerRoute('/disease', Disease);
    router.registerRoute('SearchDisease', SearchDisease);
    router.registerRoute('/area', Area);
  },
});
