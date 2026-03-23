/**
 * @file app.ts
 * @description Main application component for Ford GSHT3 Manufacturing Form
 * 
 * This component serves as the root component and manages:
 * - Overall form layout and structure
 * - Cut sections display and management
 * - Offal source section
 * - Form navigation and submission
 * - Form persistence and export
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GSHT3FormService } from './services/gsht3-form.service';
import { CutSectionComponent } from './components/cut-section/cut-section.component';
import { GSHT3Form, CutSection, OffalSource } from './models/gsht3-form.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CutSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  formData: GSHT3Form | null = null;
  showOffalSection = true;
  selectedView: 'form' | 'preview' = 'form';

  constructor(private formService: GSHT3FormService) {}

  ngOnInit(): void {
    // Subscribe to form data changes
    this.formService.formData$.subscribe(data => {
      this.formData = data;
    });
  }

  /**
   * Gets current form data
   */
  getCurrentForm(): GSHT3Form {
    return this.formService.getCurrentFormData();
  }

  /**
   * Handles cut section updates
   */
  onCutSectionUpdate(cutIndex: number, updatedSection: CutSection): void {
    this.formService.updateCutSection(cutIndex, updatedSection);
  }

  /**
   * Handles calculate operation
   */
  onCalculateOperation(cutIndex: number): void {
    const result = this.formService.calculateOperation(cutIndex, 0);
    console.log(`Calculation result for cut ${cutIndex}:`, result);
    alert(`Calculation result: ${result.toFixed(2)}`);
  }

  /**
   * Handles clear operation
   */
  onClearOperation(cutIndex: number): void {
    this.formService.clearOperation(cutIndex, 0);
  }

  /**
   * Toggles offal source section
   */
  toggleOffalSection(): void {
    this.showOffalSection = !this.showOffalSection;
  }

  /**
   * Updates offal source
   */
  onOffalSourceUpdate(): void {
    if (this.formData) {
      this.formService.updateOffalSource(this.formData.offalSource);
    }
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (this.formService.validateForm()) {
      alert('Form submitted successfully!');
      console.log('Form Data:', this.formService.exportFormAsJson());
    } else {
      alert('Form validation failed. Please check for errors.');
    }
  }

  /**
   * Saves form to localStorage
   */
  onSave(): void {
    this.formService.updateFormData(this.getCurrentForm());
    alert('Form saved successfully!');
  }

  /**
   * Resets form to initial state
   */
  onReset(): void {
    if (confirm('Are you sure you want to reset the form? All changes will be lost.')) {
      this.formService.resetForm();
    }
  }

  /**
   * Navigates to top of page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Navigates to bottom of page
   */
  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  /**
   * Exports form data as JSON file
   */
  exportFormData(): void {
    const jsonData = this.formService.exportFormAsJson();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GSHT3-${this.getCurrentForm().id}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Toggles between form and preview views
   */
  toggleView(view: 'form' | 'preview'): void {
    this.selectedView = view;
  }

  /**
   * TrackBy function for ngFor optimization
   */
  trackByIndex(index: number): number {
    return index;
  }
}
