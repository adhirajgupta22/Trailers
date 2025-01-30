import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../store/authUser';

const HomePage = () => {
  const {user} = useAuthStore(); //when login is there already directly homescreen will open
  return (
    <>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </>
  ) 
}
export default HomePage;