import React from 'react';

/**
 * Component to display the color palette for the dark theme
 * This is useful for developers to see the available colors and use them consistently
 */
const ThemePalette = () => {
  const colors = [
    { name: 'Background Primary', var: '--bg-primary', hex: '#171E26' },
    { name: 'Background Secondary', var: '--bg-secondary', hex: '#1E2631' },
    { name: 'Background Tertiary', var: '--bg-tertiary', hex: '#252E3A' },
    { name: 'Card Background', var: '--card-bg', hex: 'rgba(30, 38, 49, 0.95)' },
    { name: 'Input Background', var: '--input-bg', hex: '#252E3A' },
    { name: 'Text Primary', var: '--text-primary', hex: '#FFFFFF' },
    { name: 'Text Secondary', var: '--text-secondary', hex: '#B0B7C3' },
    { name: 'Text Muted', var: '--text-muted', hex: '#6B7280' },
    { name: 'Border', var: '--border', hex: '#2D3748' },
    { name: 'Accent', var: '--accent', hex: '#3B82F6' },
    { name: 'Accent Hover', var: '--accent-hover', hex: '#2563EB' }
  ];

  return (
    <div className="p-6 bg-theme-primary text-theme-primary">
      <h2 className="text-2xl font-bold mb-6">Dark Theme Color Palette</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="rounded-lg overflow-hidden border border-theme"
          >
            <div 
              className="h-20" 
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="p-4 bg-theme-secondary">
              <h3 className="font-medium">{color.name}</h3>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-theme-secondary">{color.var}</span>
                <span className="text-sm text-theme-secondary">{color.hex}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Sample UI Elements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 bg-theme-card rounded-lg border border-theme">
            <h4 className="text-lg font-medium mb-2">Card Component</h4>
            <p className="text-theme-secondary mb-4">This is how cards will look with the dark theme applied.</p>
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">Button</button>
          </div>
          
          <div className="p-4 bg-theme-secondary rounded-lg border border-theme">
            <h4 className="text-lg font-medium mb-2">Form Example</h4>
            <div className="mb-4">
              <label className="block text-theme-secondary mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-2 rounded-md bg-theme-input border border-theme"
                placeholder="user@example.com"
              />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePalette; 