import '../styles/globals.css'
import { store } from "../store/store"
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '../components/mail/u/id/inboxPage/header';
import Sidebar from '../components/mail/u/id/inboxPage/Sidebar';
import classes from "../styles/inboxPage/Inbox.module.css"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
 const a = router.route
 const b = "/mail/u/[id]/inbox"
  return (
    <Provider store={store}>
      {router.route.includes(b)  ? (
        <>
          <Header />
          <div className={classes.main}>
            <Sidebar />
            <Component {...pageProps} />
          </div>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  ); 
}

export default MyApp





//       <Provider store={store}>
//       <div className={classes.main}>
   
//         <Component {...pageProps} />
//         </div>
//       </Provider>
//     </>
//   ); 
// }