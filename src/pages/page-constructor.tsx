import { ReactNode, useEffect } from 'react';
import AppHeader from "../components/app-header/app-header";
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { fetchBurgersData } from '../services/burger/actions/action-creators';

type PageConstructorProps = {
  children: ReactNode
}

export default function PageConstructor({children}: PageConstructorProps) {
  const { burgersData } = useAppSelector(state => state.burgers);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (!burgersData.length)
    dispatch(fetchBurgersData())
  }, [dispatch, burgersData])

  return (
    <div className="App">
      <AppHeader />
      <main className="container">
        {children}
      </main>
    </div>
  )
}


