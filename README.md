# Ford GSHT3 Manufacturing Form - Angular SPA

## Overview

This is a professional single-page application (SPA) built with Angular for managing and creating GSHT3 manufacturing forms for Ford's internal systems. The application provides a comprehensive interface for handling tool operations, material specifications, and offal source tracking.

## Features

✨ **Complete Feature Set:**
- **Professional UI/UX** - Dark header with Ford branding and beige form area
- **Cut Section Management** - Support for multiple cut sections (2nd cut, 3rd cut, etc.)
- **Tool Operations** - Manage multiple tool operations per cut with detailed parameters
- **Blank Specifications** - Track raw material and blank weight measurements
- **Tool Parameters** - Record pitch, hits, blanks, parts, and radius data
- **Offal Source Tracking** - Manage offal source specifications and related data
- **Form Persistence** - Automatic saving to localStorage
- **Data Export** - Export form data as JSON file
- **Form Validation** - Comprehensive validation checks
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Professional Styling** - SCSS-based styling with smooth animations

## Project Structure

```
ford-gsht3-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── cut-section/
│   │   │       ├── cut-section.component.ts
│   │   │       ├── cut-section.component.html
│   │   │       └── cut-section.component.scss
│   │   ├── models/
│   │   │   └── gsht3-form.model.ts
│   │   ├── services/
│   │   │   └── gsht3-form.service.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── styles.scss
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── README.md
└── ... (other config files)
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18 or higher)

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd ford-gsht3-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ng serve
   # or
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200`

## Usage Guide

### Creating a Form

1. **Fill in Cut Operations:**
   - Enter operation numbers, press IDs, and tool information
   - Select tool descriptions and types from dropdowns
   - Enter cut sizes and blade angles

2. **Manage Blank Specifications:**
   - Click the "▶ Blank Specifications" toggle to expand
   - Enter cut width, material weight, and actual measurements

3. **Enter Tool Parameters:**
   - Click the "▶ Tool Parameters" toggle to expand
   - Record pitch, hits, blanks, parts, and radius values

4. **Add Multiple Operations:**
   - Click "+ Add Operation" to add more tool operations to a cut section

5. **Remove Operations:**
   - Click the remove button on any operation to delete it

### Offal Source Tracking

1. **Expand Offal Section:**
   - Click the "▶ Offal Source Used" toggle at the bottom

2. **Fill Offal Information:**
   - Select a specification from the dropdown
   - Enter source part/item number
   - Add B-number identifier
   - Enter parts/offal information

### Saving and Exporting

- **Save Form:** Click "Save" button to persist data to browser localStorage
- **Export Form:** Click "Export as JSON" button to download form data as a JSON file
- **Reset Form:** Click "Reset" button (with confirmation) to clear all data

## Architecture

### Data Models (`gsht3-form.model.ts`)
- **GSHT3Form** - Main form data structure
- **CutSection** - Represents a single cut operation section
- **ToolOperation** - Individual tool operation details
- **BlankSpecification** - Material and weight specifications
- **ToolParameters** - Tool measurement parameters
- **OffalSource** - Offal source tracking information

### Services (`gsht3-form.service.ts`)
- **GSHT3FormService** - Centralized service for:
  - Form data management
  - Data persistence (localStorage)
  - Validation logic
  - Calculation operations
  - Import/Export functionality

### Components

#### App Component (`app.ts`)
- Main application component
- Manages overall form state
- Handles form submission and navigation

#### CutSectionComponent (`cut-section.component.ts`)
- Reusable component for each cut section
- Manages tool operations display
- Handles blank specifications and tool parameters
- Supports dynamic operation management

## Key Technologies

- **Angular 18+** - Modern Angular framework with standalone components
- **TypeScript** - Strongly typed programming language
- **SCSS** - Advanced CSS styling with variables and mixins
- **RxJS** - Reactive programming with Observables
- **FormsModule** - Template-driven forms with two-way binding

## Form Validation

The application includes built-in validation for:
- Required fields
- Data format validation
- Range validation for numerical fields
- Operation number uniqueness

Validation errors are tracked and can be retrieved via the service:
```typescript
const errors = formService.getValidationErrors();
```

## Data Persistence

### LocalStorage
- Form data is automatically saved to browser's localStorage
- Data persists across browser sessions
- Storage key: `gsht3_form_data`

### Manual Export
- Export form as JSON file for backup or transfer
- Import JSON data to restore previous forms

## Styling Guide

### Color Scheme
- **Header Background**: `#3a3a3a` (Dark Gray)
- **Form Background**: `#e8d7c3` (Beige)
- **Button Primary**: `#333` (Dark Gray)
- **Button Accent**: `#d4a574` (Tan)
- **Input Background**: `#fff` (White)

### Responsive Breakpoints
- **Large Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## Build & Deployment

### Development Build
```bash
ng serve
```

### Production Build
```bash
ng build
# Output will be in dist/ford-gsht3-app/
```

### Serve Production Build
```bash
ng build && npm start
```

## API Reference

### GSHT3FormService Methods

**getCurrentFormData()**: Returns the current form data
```typescript
const form = formService.getCurrentFormData();
```

**updateFormData(formData: GSHT3Form)**: Updates entire form
```typescript
formService.updateFormData(myForm);
```

**updateCutSection(cutIndex, cutSection)**: Updates a specific cut section
```typescript
formService.updateCutSection(0, updatedCutSection);
```

**updateToolOperation(cutIndex, operationIndex, operation)**: Updates tool operation
```typescript
formService.updateToolOperation(0, 0, updatedOperation);
```

**validateForm()**: Validates entire form
```typescript
const isValid = formService.validateForm();
```

**exportFormAsJson()**: Exports form as JSON string
```typescript
const json = formService.exportFormAsJson();
```

**importFormFromJson(jsonData)**: Imports form from JSON
```typescript
const success = formService.importFormFromJson(jsonString);
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **TrackBy Function**: Used in ngFor loops for optimal change detection
- **OnPush Strategy**: Can be added for further optimization
- **LocalStorage**: Limited to ~5-10MB per domain (typically sufficient for this form)

## Accessibility

- **ARIA Labels**: Added to all interactive elements
- **Focus Management**: Keyboard navigation support
- **Color Contrast**: WCAG AA compliant colors
- **Screen Reader Support**: Semantic HTML and labels

## Troubleshooting

### Form Data Not Saving
1. Check browser's localStorage is enabled
2. Check browser console for errors
3. Try clearing cache and reloading

### Display Issues
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser's developer console for SCSS compilation errors

### Form Validation Errors
1. Check required fields are filled
2. Verify data format for numerical fields
3. Review validation error messages in browser console

## Development Guidelines

### Adding New Fields
1. Update the interface in `gsht3-form.model.ts`
2. Update the service creation methods
3. Add form binding in component template
4. Add styling as needed

### Adding Calculations
1. Extend `calculateOperation()` method in service
2. Add calculation logic with proper error handling
3. Emit results through component events

### Extending Components
1. Create new component as standalone
2. Add to app component imports
3. Implement two-way data binding via event emitters
4. Add corresponding SCSS file

## Security Considerations

- **Input Validation**: Always validate user input
- **XSS Protection**: Angular sanitizes HTML by default
- **CSRF**: Configure CSRF tokens if using backend API
- **Data Encryption**: Encrypt sensitive data before export

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Database persistence
- [ ] Multi-user collaboration
- [ ] Advanced reporting
- [ ] Calculation engine
- [ ] Mobile app version
- [ ] PWA capabilities
- [ ] Audit logging
- [ ] Role-based access control

## Version History

- **v1.0.0** (March 2026) - Initial release
  - Complete GSHT3 form functionality
  - Professional UI/UX
  - LocalStorage persistence
  - JSON export capability

---

**Last Updated**: March 20, 2026

**Application**: Ford GSHT3 Manufacturing Form - Angular SPA

**Version**: 1.0.0

**Status**: Production Ready ✓
