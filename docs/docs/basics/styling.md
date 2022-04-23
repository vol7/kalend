---
sidebar_position: 8
---

# Styling

To adjust colors for today date circle, you can pass style prop to Kalend like this:
    
    <Kalend
      colors={{
        light: {
          primaryColor: 'blue',
        },
        dark: {
          primaryColor: 'orange',
        },
      }}
    />

For now, Kalend does not support further style settings, but you can adjust css class names used in components.

# Dark theme

You can choose light (default) or dark theme with prop ```isDark```.

To modify colors for each theme, you will have to pass props colors.
