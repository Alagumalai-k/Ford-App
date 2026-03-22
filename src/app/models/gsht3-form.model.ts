/**
 * @file gsht3-form.model.ts
 * @description Data models and interfaces for the GSHT3 form
 * 
 * This file defines all TypeScript interfaces and models used throughout the application
 * for handling form data, cut operations, tool parameters, and offal source tracking.
 */

/**
 * Represents a single tool operation with its parameters
 */
export interface ToolOperation {
  operationNumber: string;      // e.g., "140b Op."
  pressId: string;              // Press identifier
  presscodeNumber: string;       // Presscode number
  toolNumber: string;           // Tool identification number
  toolDescription: string;      // Description of the tool
  toolType: string;             // Type of tool (from dropdown)
  cutSizeNewAvail: string;      // New/Avail
  cutSize1: string;             // Cut Size 1 (J)
  cutSize2: string;             // Cut Size 2 (K)
  bladeAngle: string;           // Blade Angle (A°)
  cutWidth: string;             // Cut Width
  rawMaterialBlankWeight: string; // Raw Material Blank Weight [kg]
  realBlankWeight: string;       // Real Blank Weight
  actualBlankWidth: string;      // Actual Blank Width
  actualBlankLength: string;     // Actual Blank Length
  pitch: string;                 // Pitch
  hits: string;                  // Hits
  blanks: string;                // Blanks
  parts: string;                 // Parts
  radius: string;                // Radius
}

/**
 * Represents raw material and blank weight specifications
 */
export interface BlankSpecification {
  cutWidth: string;             // Cut width measurement
  rawMaterialBlankWeight: string; // Raw material blank weight in kg
  realBlankWeight: string;       // Real blank weight
  actualBlankWidth: string;      // Actual blank width measurement
  actualBlankLength: string;     // Actual blank length measurement
}

/**
 * Represents tool parameters and measurements for a cut operation
 */
export interface ToolParameters {
  pitch: string;                 // Pitch measurement
  hits: string;                  // Number of hits
  blanks: string;                // Number of blanks
  parts: string;                 // Number of parts
  radius: string;                // Radius measurement
}

/**
 * Represents a complete cut section (2nd cut, 3rd cut, etc.)
 */
export interface CutSection {
  cutNumber: string;             // "2nd cut", "3rd cut", etc.
  operations: ToolOperation[];   // Array of tool operations
  blankSpec: BlankSpecification; // Blank specifications
  toolParams: ToolParameters;    // Tool parameters
}

/**
 * Represents offal source tracking information
 */
export interface OffalSource {
  offalSourceSpec: string;       // Offal source specification
  clearOffalSource: string;      // Clear offal source field
  sourcePartItemNumber: string;  // Source part/item number
  bNumber: string;               // B-number identifier
  partsOffal: string;            // Parts offal information
}

/**
 * Main GSHT3 form data model
 */
export interface GSHT3Form {
  id: string;                    // Form unique identifier
  createdDate: Date;             // Date form was created
  lastModifiedDate: Date;        // Date form was last modified
  cutSections: CutSection[];     // Array of cut sections (2nd, 3rd cuts, etc.)
  offalSource: OffalSource;      // Offal source information
  status: FormStatus;            // Current form status
  notes?: string;                // Optional notes/comments
}

/**
 * Enumeration for form status
 */
export enum FormStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

/**
 * Interface for form validation errors
 */
export interface FormValidationError {
  fieldName: string;
  errorMessage: string;
  errorType: ValidationType;
}

/**
 * Enumeration for validation types
 */
export enum ValidationType {
  REQUIRED = 'required',
  INVALID_FORMAT = 'invalid_format',
  OUT_OF_RANGE = 'out_of_range'
}
