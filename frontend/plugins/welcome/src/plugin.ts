import { createPlugin } from '@backstage/core';
import WelcomePage from './components/WelcomePage';
// import WatchVideo from './components/WatchVideo'
import SignIn from './components/SignIn'
import Drug from './components/Drug'
import Patient from './components/Patient'
import Diagnosis from './components/Diagnosis'
import Disease from './components/Disease'

export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/', WelcomePage);
//    router.registerRoute('/watch_video', WatchVideo);
//    router.registerRoute('/signin', SignIn);
    router.registerRoute('/drug', Drug);
    router.registerRoute('/patient', Patient);
    router.registerRoute('/diagnosis', Diagnosis);
    router.registerRoute('/disease', Disease);
  },
});
