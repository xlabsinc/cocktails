// Generated by Copilot
import React, { useState } from 'react';
import { useCocktail } from '../../context/CocktailContext';
import { 
  Card, 
  TextField, 
  Button, 
  SecondaryButton,
  ButtonGroup,
  Divider,
  Section,
  Title
} from '../ui/StyledComponents';

const SourceManagement: React.FC = () => {
  const { sources, addSource, removeSource } = useCocktail();
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddSource = () => {
    // Basic URL validation
    try {
      new URL(newUrl);
      addSource(newUrl);
      setNewUrl('');
      setError(null);
    } catch (e) {
      setError('Please enter a valid URL');
    }
  };

  return (
    <Card>
      <Section>
        <Title style={{ fontSize: '1.5rem' }}>Data Sources</Title>
        <p>Add custom URLs to fetch cocktail recipes or remove existing ones.</p>
        
        <div style={{ marginBottom: '20px' }}>
          <TextField
            type="text"
            placeholder="Enter URL for cocktail data source"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          {error && <p style={{ color: '#cf1322', margin: '8px 0' }}>{error}</p>}
          <ButtonGroup>
            <Button onClick={handleAddSource} disabled={!newUrl.trim()}>
              Add Source
            </Button>
          </ButtonGroup>
        </div>
        
        <Divider />
        
        <h3>Current Sources</h3>
        {sources.length === 0 ? (
          <p>No sources added yet.</p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {sources.map((source, index) => (
              <li key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ wordBreak: 'break-all', paddingRight: '16px' }}>
                    {source.url}
                    {source.isDefault && (
                      <span style={{ marginLeft: '8px', color: '#86868b', fontSize: '14px' }}>
                        (Default)
                      </span>
                    )}
                  </div>
                  <SecondaryButton 
                    onClick={() => removeSource(source.url)}
                    style={{ minWidth: 'auto', padding: '8px 12px' }}
                  >
                    Remove
                  </SecondaryButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </Card>
  );
};

export default SourceManagement;