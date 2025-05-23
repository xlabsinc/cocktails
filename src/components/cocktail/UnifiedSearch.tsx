// Generated by Copilot
import React, { useState, useMemo, KeyboardEvent } from 'react';
import { useCocktail } from '../../context/CocktailContext';
import { useFuzzySearch } from '../../hooks/useFuzzySearch';
import { Card, Section, Title, IngredientTag, Button, ButtonGroup, SearchInput } from '../ui/StyledComponents';
import { Cocktail } from '../../types/cocktail';

// Type for search results that can be either ingredients or cocktails
type SearchResultItem = {
  type: 'ingredient' | 'cocktail';
  value: string | Cocktail;
};

const UnifiedSearch: React.FC = () => {
  const { 
    allIngredients, 
    selectedIngredients, 
    toggleIngredient, 
    resetSelections,
    cocktails 
  } = useCocktail();
  const [searchTerm, setSearchTerm] = useState('');
  const [_selectedCocktail, _setSelectedCocktail] = useState<Cocktail | null>(null);
  
  // Use fuzzy search for ingredients
  const { results: filteredIngredients } = useFuzzySearch({
    items: allIngredients,
    keys: [''],
    threshold: 0.3,
  });
  
  // Use fuzzy search for cocktails
  const { results: filteredCocktails } = useFuzzySearch({
    items: cocktails,
    keys: ['name', 'ingredients'],
    threshold: 0.3,
  });
  
  // Combine and filter search results
  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    
    // Get filtered ingredients with explicit type assertion
    const ingredientResults: SearchResultItem[] = filteredIngredients
      .filter(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(ingredient => ({
        type: 'ingredient' as const,
        value: ingredient
      }));
    
    // Get filtered cocktails with explicit type assertion
    const cocktailResults: SearchResultItem[] = filteredCocktails
      .filter(cocktail => {
        // Don't show the currently selected cocktail in search results
        if (_selectedCocktail && cocktail.name === _selectedCocktail.name) {
          return false;
        }
        
        const cocktailNameMatch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase());
        const ingredientMatch = cocktail.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return cocktailNameMatch || ingredientMatch;
      })
      .map(cocktail => ({
        type: 'cocktail' as const,
        value: cocktail
      }));
    
    // Combine results - show ingredients first, then cocktails
    return [...ingredientResults.slice(0, 5), ...cocktailResults.slice(0, 5)];
  }, [filteredIngredients, filteredCocktails, searchTerm, _selectedCocktail]);
  
  // Handle manually adding a custom search term
  const _addCustomSearchTerm = () => {
    if (!searchTerm.trim()) return;
    
    // First check if there's an exact match in the existing ingredients
    const exactIngredientMatch = allIngredients.find(
      ingredient => ingredient.toLowerCase() === searchTerm.toLowerCase()
    );
    
    if (exactIngredientMatch) {
      // If it's an exact match to an existing ingredient, toggle that one
      toggleIngredient(exactIngredientMatch);
    } else {
      // Otherwise add it as a custom ingredient
      const formattedTerm = searchTerm.trim();
      
      // If it's not already in the selected ingredients, add it
      if (!selectedIngredients[formattedTerm]) {
        toggleIngredient(formattedTerm);
      }
    }
    
    setSearchTerm('');
  };
  
  // Handle key press events
  const _handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      _addCustomSearchTerm();
    }
  };
  
  const _handleSelectItem = (item: SearchResultItem) => {
    if (item.type === 'ingredient') {
      toggleIngredient(item.value as string);
    } else if (item.type === 'cocktail') {
      // When a cocktail is selected, extract and toggle its ingredients
      const cocktail = item.value as Cocktail;
      _setSelectedCocktail(cocktail);
      
      // Extract ingredients from the selected cocktail
      // and toggle them on
      cocktail.ingredients.forEach(ingredientText => {
        // Try to find matching ingredients from our full list
        const matchingIngredients = allIngredients.filter(ingredient => 
          ingredientText.toLowerCase().includes(ingredient.toLowerCase())
        );
        
        // If we found matches, toggle them on
        matchingIngredients.forEach(ingredient => {
          if (!selectedIngredients[ingredient]) {
            toggleIngredient(ingredient);
          }
        });
      });
    }
    
    // Clear search after selection
    setSearchTerm('');
  };
  
  // Get all selected ingredients
  const selectedIngredientsList = useMemo(() => 
    Object.entries(selectedIngredients)
      .filter(([_, isSelected]) => isSelected)
      .map(([ingredient]) => ingredient),
    [selectedIngredients]
  );

  // When there's a selected cocktail, show its name
  const _selectedCocktailSection = _selectedCocktail ? (
    <div style={{ marginTop: '15px', padding: '10px 15px', background: '#e6f7ff', borderRadius: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: '0 0 5px 0' }}>Selected Cocktail:</h4>
        <span 
          style={{ cursor: 'pointer', fontSize: '18px' }} 
          onClick={() => _setSelectedCocktail(null)}
        >✕</span>
      </div>
      <p style={{ margin: '0', fontWeight: 'bold' }}>{_selectedCocktail.name}</p>
    </div>
  ) : null;

  return (
    <Card>
      <Section>
        <Title style={{ fontSize: '1.5rem' }}>Search</Title>
        <p>Search for ingredients or cocktails (press Enter to add custom text)</p>
        
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <SearchInput
            type="text"
            placeholder="Type and press Enter or select from dropdown..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={_handleKeyPress}
          />
          
          {searchTerm && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              maxHeight: '300px',
              overflowY: 'auto',
              zIndex: 10,
              padding: '8px 0',
              marginTop: '4px'
            }}>
              {/* Add option to enter custom term */}
              {searchTerm.trim() && (
                <div 
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #eee'
                  }}
                  onClick={_addCustomSearchTerm}
                >
                  <span style={{ 
                    background: '#e8f4e8', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    marginRight: '8px',
                    fontSize: '12px'
                  }}>
                    Add Custom
                  </span>
                  "{searchTerm.trim()}"
                </div>
              )}
              
              {searchResults.map((item, index) => {
                if (item.type === 'ingredient') {
                  return (
                    <div 
                      key={`ingredient-${index}`}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={() => _handleSelectItem(item)}
                    >
                      <span style={{ 
                        background: '#f5f5f7', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        marginRight: '8px',
                        fontSize: '12px'
                      }}>
                        Ingredient
                      </span>
                      {item.value as string}
                    </div>
                  );
                } else {
                  const cocktail = item.value as Cocktail;
                  return (
                    <div 
                      key={`cocktail-${index}`}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={() => _handleSelectItem(item)}
                    >
                      <span style={{ 
                        background: '#e6f7ff', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        marginRight: '8px',
                        fontSize: '12px'
                      }}>
                        Cocktail
                      </span>
                      {cocktail.name}
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        
        {_selectedCocktailSection}

        {selectedIngredientsList.length > 0 && (
          <>
            <div style={{ margin: '20px 0' }}>
              <h3>Selected Ingredients:</h3>
              <div>
                {selectedIngredientsList.map((ingredient) => (
                  <IngredientTag 
                    key={ingredient}
                    active={true}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    {ingredient} ✕
                  </IngredientTag>
                ))}
              </div>
            </div>
            
            <ButtonGroup>
              <Button onClick={() => {
                resetSelections();
                _setSelectedCocktail(null);
              }}>
                Reset Selection
              </Button>
            </ButtonGroup>
          </>
        )}
      </Section>
    </Card>
  );
};

export default UnifiedSearch;