import { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import CoverageEligibilityList from './pages/CoverageEligibility/CoverageEligibilityList';
import PreauthList from './pages/Preauth/PreauthList';
import ClaimsList from './pages/Claims/Claims';
import ClaimDetail from './pages/Claims/ClaimDetails';
import CoverageEligibilityDetails from './pages/CoverageEligibility/CoverageEligibilityDetails';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  console.log("i started");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route 
          path="/payor/login" 
          element={<SignIn/>}
        >  
        </Route>
        <Route element={<DefaultLayout />}>
          <Route
            path="/payor/coverageeligibility/list"
            element={
              <>
                <PageTitle title="Coverage Eligibility" />
                <CoverageEligibilityList />
              </>
            }
          />
          <Route
            path="/payor/coverageeligibility/details"
            element={
              <>
                <PageTitle title="Coverage Eligibility" />
                <CoverageEligibilityDetails />
              </>
            }
          />
          <Route
            path="/payor/preauth/list"
            element={
              <>
                <PageTitle title="PreAuthorization" />
                <PreauthList claimType='preauth'/>
              </>
            }
          />
          
          <Route
            path="/payor/preauth/detail"
            element={
              <>
                <PageTitle title="PreAuthorization" />
                <ClaimDetail claimType='preauth'/>
              </>
            }
          />
           <Route
            path="/payor/claims/list"
            element={
              <>
                <PageTitle title="Claims" />
                <ClaimsList claimType='claim'/>
              </>
            }
          />
          <Route
            path="/payor/claims/detail"
            element={
              <>
                <PageTitle title="Claims" />
                <ClaimDetail claimType='claim'/>
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

