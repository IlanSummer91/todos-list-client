import React from 'react';
import { Footer } from './Components/layout/Footer';
import { Header } from './Components/layout/Header';
import { Section } from './Components/layout/Section';
import './App.scss';

export function App() {
  return (
    <div className="app">
      <Header></Header>
      <Section></Section>
      <Footer></Footer>
    </div>
  );
}