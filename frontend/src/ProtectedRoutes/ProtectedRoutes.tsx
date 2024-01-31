import  {Outlet, Navigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ProtectedRoutes = () => 
{

  const token = localStorage.getItem('jwtToken');
  let location = useLocation();

  const reqURL = location.pathname;
  const Roleid = localStorage.getItem('role_id');
  const reqRoleid:number= Roleid!==null ? parseInt(Roleid):0;
  // console.log("requested URL at Protected routes : ", "--", reqURL, "requested role_id : ", reqRoleid)



  const isAuthenticated = () =>
  {
    if (token) {
      interface cache_data_type { role_id: number, url: string}
      let cached_UI : string | null = localStorage.getItem('UIroles');

      let cached_UI_url:cache_data_type[] |null=null;
      if (cached_UI !== null) {
        cached_UI_url = JSON.parse(cached_UI);
        // console.log("UI roles: ", cached_UI_url);
    
        if (cached_UI_url !== null) 
        {
            const checkUI = cached_UI_url.some(data => {
                return data.role_id == reqRoleid && data.url == reqURL;
            });
    
            // console.log("check ui: ", checkUI);
    
            if (checkUI === true) {return true;} else {return false;}
          }       
          
      }

    }
    return false;


  }
  
  return (isAuthenticated() ? <Outlet /> : <Navigate to="/" />)

}
export default ProtectedRoutes;