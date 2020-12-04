import React, { useState } from 'react';
import { Footer } from './Components/layout/Footer';
import { Header } from './Components/layout/Header';
import { Section } from './Components/layout/Section';
import './App.scss';
import { AppContext } from './AppContext';

export function App() {

  const [todosCount, setTodosCount] = useState(0);
  
  const appContextValue = {
    todosCount,
    setTodosCount,
  }

  return <AppContext.Provider value={appContextValue}>
      <div className="app">
        <Header></Header>
        <Section></Section>
        <Footer></Footer>  
      </div>
    </AppContext.Provider>
}