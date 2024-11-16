import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home.jsx'
import App from '../App';
import FindJobsPage from '../component/FindJobsPage.jsx';
import HirePage from '../component/HirePage.jsx';
import Signup from '../Pages/WorkerSignup.jsx';

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'/find-jobs/:profession',
                element:<FindJobsPage/>
            },
            {
                path:'/hire/:profession',
                element:<HirePage/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
        ]
    }
])


export default router;