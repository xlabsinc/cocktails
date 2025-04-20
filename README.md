# Cocktail Finder

A responsive React web application for discovering cocktail recipes based on available ingredients. The app uses a modern, Apple-inspired UI design for an intuitive and pleasant user experience.

## Features

- **Ingredient Search**: Fuzzy search for ingredients and cocktails
- **Dynamic Cocktail Filtering**: See cocktails that can be made with your selected ingredients
- **Custom Data Sources**: Add your own cocktail data sources via URLs
- **Responsive Design**: Works on mobile, tablet and desktop
- **Apple-style UI**: Clean, modern interface inspired by Apple's design language

## Getting Started

### Prerequisites

- Node.js 14+ installed

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cocktail-js6.git
   cd cocktail-js6
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The application will open in your browser at `http://localhost:3000`.

## Usage

1. **Search for ingredients**: Use the search bar to find ingredients you have
2. **Select ingredients**: Click on ingredients to add them to your selected list
3. **View matching cocktails**: See all cocktails that can be made with your selections
4. **Search cocktails**: Use the search bar to filter cocktails by name or ingredients
5. **Dismiss cocktails**: Click the X to remove a cocktail from view
6. **Reset**: Click the Reset button to clear all ingredient selections
7. **Add custom data sources**: Use the Data Sources section to add additional cocktail data URLs

## Deployment

The application is set up for easy deployment to GitHub Pages:

```
npm run deploy
```

This will build the application and deploy it to the `gh-pages` branch in your repository.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better development experience
- [Styled Components](https://styled-components.com/) - For component-based styling
- [Fuse.js](https://fusejs.io/) - Lightweight fuzzy-search library
- [Axios](https://axios-http.com/) - Promise-based HTTP client

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sources: [Cocktail API](https://github.com/xbalajipge)
