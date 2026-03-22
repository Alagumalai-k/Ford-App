/**
 * @file gsht3-form.service.ts
 * @description Service for managing GSHT3 form data and operations
 * 
 * This service provides centralized business logic for:
 * - Creating and managing form data
 * - Performing calculations on cut operations
 * - Validating form inputs
 * - Managing form state and persistence
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  GSHT3Form,
  CutSection,
  ToolOperation,
  BlankSpecification,
  ToolParameters,
  OffalSource,
  FormStatus,
  FormValidationError,
  ValidationType
} from '../models/gsht3-form.model';

@Injectable({
  providedIn: 'root'
})
export class GSHT3FormService {
  // Observable state management
  private formDataSubject = new BehaviorSubject<GSHT3Form>(this.createEmptyForm());
  public formData$ = this.formDataSubject.asObservable();

  private validationErrorsSubject = new BehaviorSubject<FormValidationError[]>([]);
  public validationErrors$ = this.validationErrorsSubject.asObservable();

  // Storage key for localStorage
  private readonly STORAGE_KEY = 'gsht3_form_data';

  constructor() {
    this.loadFormFromStorage();
  }

  /**
   * Creates an empty GSHT3 form with default structure
   */
  private createEmptyForm(): GSHT3Form {
    return {
      id: this.generateFormId(),
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      cutSections: [
        this.createEmptyCutSection('2nd cut'),
        this.createEmptyCutSection('3rd cut')
      ],
      offalSource: this.createEmptyOffalSource(),
      status: FormStatus.DRAFT,
      notes: ''
    };
  }

  /**
   * Creates an empty cut section with initialized fields
   */
  private createEmptyCutSection(cutNumber: string): CutSection {
    return {
      cutNumber,
      operations: [this.createEmptyToolOperation()],
      blankSpec: this.createEmptyBlankSpecification(),
      toolParams: this.createEmptyToolParameters()
    };
  }

  /**
   * Creates an empty tool operation
   */
  private createEmptyToolOperation(): ToolOperation {
    return {
      operationNumber: '',
      pressId: '',
      presscodeNumber: '',
      toolNumber: '',
      toolDescription: '',
      toolType: '',
      cutSizeNewAvail: '',
      cutSize1: '',
      cutSize2: '',
      bladeAngle: '',
      cutWidth: '',
      rawMaterialBlankWeight: '',
      realBlankWeight: '',
      actualBlankWidth: '',
      actualBlankLength: '',
      pitch: '',
      hits: '',
      blanks: '',
      parts: '',
      radius: ''
    };
  }

  /**
   * Creates empty blank specifications
   */
  private createEmptyBlankSpecification(): BlankSpecification {
    return {
      cutWidth: '',
      rawMaterialBlankWeight: '',
      realBlankWeight: '',
      actualBlankWidth: '',
      actualBlankLength: ''
    };
  }

  /**
   * Creates empty tool parameters
   */
  private createEmptyToolParameters(): ToolParameters {
    return {
      pitch: '',
      hits: '',
      blanks: '',
      parts: '',
      radius: ''
    };
  }

  /**
   * Creates empty offal source data
   */
  private createEmptyOffalSource(): OffalSource {
    return {
      offalSourceSpec: '',
      clearOffalSource: '',
      sourcePartItemNumber: '',
      bNumber: '',
      partsOffal: ''
    };
  }

  /**
   * Generates a unique form ID
   */
  private generateFormId(): string {
    return `GSHT3-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Gets the current form data
   */
  getCurrentFormData(): GSHT3Form {
    return this.formDataSubject.value;
  }

  /**
   * Updates the entire form data
   */
  updateFormData(formData: GSHT3Form): void {
    formData.lastModifiedDate = new Date();
    this.formDataSubject.next(formData);
    this.saveFormToStorage(formData);
  }

  /**
   * Updates a specific cut section
   */
  updateCutSection(cutIndex: number, cutSection: CutSection): void {
    const formData = this.getCurrentFormData();
    if (cutIndex >= 0 && cutIndex < formData.cutSections.length) {
      formData.cutSections[cutIndex] = cutSection;
      this.updateFormData(formData);
    }
  }

  /**
   * Updates a tool operation in a specific cut section
   */
  updateToolOperation(cutIndex: number, operationIndex: number, operation: ToolOperation): void {
    const formData = this.getCurrentFormData();
    if (cutIndex >= 0 && cutIndex < formData.cutSections.length &&
        operationIndex >= 0 && operationIndex < formData.cutSections[cutIndex].operations.length) {
      formData.cutSections[cutIndex].operations[operationIndex] = operation;
      this.updateFormData(formData);
    }
  }

  /**
   * Adds a new tool operation to a cut section
   */
  addToolOperation(cutIndex: number): void {
    const formData = this.getCurrentFormData();
    if (cutIndex >= 0 && cutIndex < formData.cutSections.length) {
      formData.cutSections[cutIndex].operations.push(this.createEmptyToolOperation());
      this.updateFormData(formData);
    }
  }

  /**
   * Removes a tool operation from a cut section
   */
  removeToolOperation(cutIndex: number, operationIndex: number): void {
    const formData = this.getCurrentFormData();
    if (cutIndex >= 0 && cutIndex < formData.cutSections.length &&
        operationIndex >= 0 && operationIndex < formData.cutSections[cutIndex].operations.length) {
      formData.cutSections[cutIndex].operations.splice(operationIndex, 1);
      this.updateFormData(formData);
    }
  }

  /**
   * Updates offal source information
   */
  updateOffalSource(offalSource: OffalSource): void {
    const formData = this.getCurrentFormData();
    formData.offalSource = offalSource;
    this.updateFormData(formData);
  }

  /**
   * Performs calculation operations (mock implementation)
   */
  calculateOperation(cutIndex: number, operationIndex: number): number {
    const formData = this.getCurrentFormData();
    if (cutIndex >= 0 && cutIndex < formData.cutSections.length &&
        operationIndex >= 0 && operationIndex < formData.cutSections[cutIndex].operations.length) {
      const operation = formData.cutSections[cutIndex].operations[operationIndex];
      // Mock calculation: could involve weight calculations, material specs, etc.
      return Math.random() * 100; // Placeholder calculation
    }
    return 0;
  }

  /**
   * Clears/resets an operation
   */
  clearOperation(cutIndex: number, operationIndex: number): void {
    this.updateToolOperation(cutIndex, operationIndex, this.createEmptyToolOperation());
  }

  /**
   * Clears an entire cut section
   */
  clearCutSection(cutIndex: number): void {
    this.updateCutSection(cutIndex, this.createEmptyCutSection(`Cut ${cutIndex + 1}`));
  }

  /**
   * Validates the entire form
   */
  validateForm(): boolean {
    const errors: FormValidationError[] = [];
    const formData = this.getCurrentFormData();

    // Validate cut sections
    formData.cutSections.forEach((section, sectionIndex) => {
      section.operations.forEach((operation, opIndex) => {
        if (!operation.operationNumber) {
          errors.push({
            fieldName: `section_${sectionIndex}_operation_${opIndex}_operationNumber`,
            errorMessage: 'Operation number is required',
            errorType: ValidationType.REQUIRED
          });
        }
      });
    });

    this.validationErrorsSubject.next(errors);
    return errors.length === 0;
  }

  /**
   * Retrieves validation errors
   */
  getValidationErrors(): FormValidationError[] {
    return this.validationErrorsSubject.value;
  }

  /**
   * Clears validation errors
   */
  clearValidationErrors(): void {
    this.validationErrorsSubject.next([]);
  }

  /**
   * Updates form status
   */
  updateFormStatus(status: FormStatus): void {
    const formData = this.getCurrentFormData();
    formData.status = status;
    this.updateFormData(formData);
  }

  /**
   * Saves form data to localStorage
   */
  private saveFormToStorage(formData: GSHT3Form): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form to storage:', error);
    }
  }

  /**
   * Loads form data from localStorage
   */
  private loadFormFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const loadedForm = JSON.parse(stored);
        loadedForm.createdDate = new Date(loadedForm.createdDate);
        loadedForm.lastModifiedDate = new Date(loadedForm.lastModifiedDate);
        this.formDataSubject.next(loadedForm);
      }
    } catch (error) {
      console.error('Error loading form from storage:', error);
    }
  }

  /**
   * Resets form to initial empty state
   */
  resetForm(): void {
    this.formDataSubject.next(this.createEmptyForm());
    localStorage.removeItem(this.STORAGE_KEY);
    this.clearValidationErrors();
  }

  /**
   * Exports form data as JSON
   */
  exportFormAsJson(): string {
    return JSON.stringify(this.getCurrentFormData(), null, 2);
  }

  /**
   * Imports form data from JSON
   */
  importFormFromJson(jsonData: string): boolean {
    try {
      const importedForm = JSON.parse(jsonData) as GSHT3Form;
      importedForm.lastModifiedDate = new Date();
      this.updateFormData(importedForm);
      return true;
    } catch (error) {
      console.error('Error importing form:', error);
      return false;
    }
  }
}
