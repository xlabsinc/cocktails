import React, { useState } from 'react';
import { CocktailProvider, useCocktail } from './context/CocktailContext';
import UnifiedSearch from './components/cocktail/UnifiedSearch';
import CocktailList from './components/cocktail/CocktailList';
import SourceManagement from './components/cocktail/SourceManagement';
import { AppContainer, Header, Title, Subtitle, Card, Button, Loading, ErrorMessage } from './components/ui/StyledComponents';
import './App.css';

// Main content component separated from provider
const AppContent: React.FC = () => {
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const { loading, error } = useCocktail();

  return (
    <AppContainer>
      <Header>
        <Title>Cocktail Finder</Title>
        <Subtitle>Find cocktails based on ingredients you have</Subtitle>
      </Header>

      {error && (
        <ErrorMessage>
          {error}. Please check your network connection or try different data sources.
        </ErrorMessage>
      )}

      <Card>
        <Button 
          onClick={() => setIsSourceModalOpen(!isSourceModalOpen)}
          style={{ marginBottom: isSourceModalOpen ? '20px' : '0' }}
        >
          {isSourceModalOpen ? 'Hide Data Sources' : 'Manage Data Sources'}
        </Button>
        
        {isSourceModalOpen && (
          <SourceManagement />
        )}
      </Card>

      {loading ? (
        <Loading>
          <div>Loading cocktail data...</div>
        </Loading>
      ) : (
        <>
          <UnifiedSearch />
          <CocktailList />
        </>
      )}
    </AppContainer>
  );
};

function App() {
  return (
    <CocktailProvider>
      <AppContent />
    </CocktailProvider>
  );
}

export default App;
