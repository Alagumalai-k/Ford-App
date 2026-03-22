/**
 * @file cut-section.component.ts
 * @description Component for rendering and managing a single cut section (2nd cut, 3rd cut, etc.)
 * 
 * This component handles:
 * - Display and editing of tool operations
 * - Blank specifications input
 * - Tool parameters input
 * - Calculate and clear operations
 * - Dynamic operation management
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CutSection, ToolOperation } from '../../models/gsht3-form.model';
import { GSHT3FormService } from '../../services/gsht3-form.service';

@Component({
  selector: 'app-cut-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cut-section.component.html',
  styleUrls: ['./cut-section.component.scss']
})
export class CutSectionComponent implements OnInit {
  @Input() cutSection!: CutSection;
  @Input() sectionIndex: number = 0;
  @Output() updateSection = new EventEmitter<CutSection>();
  @Output() calculateOperation = new EventEmitter<number>();
  @Output() clearOperation = new EventEmitter<number>();

  constructor(private formService: GSHT3FormService) {}

  ngOnInit(): void {
    if (!this.cutSection) {
      this.cutSection = {
        cutNumber: '',
        operations: [],
        blankSpec: {
          cutWidth: '',
          rawMaterialBlankWeight: '',
          realBlankWeight: '',
          actualBlankWidth: '',
          actualBlankLength: ''
        },
        toolParams: {
          pitch: '',
          hits: '',
          blanks: '',
          parts: '',
          radius: ''
        }
      };
    }
  }

  /**
   * Handles operation field changes
   */
  onOperationChange(index: number): void {
    this.updateSection.emit(this.cutSection);
  }

  /**
   * Triggers calculation for an operation
   */
  onCalculate(operationIndex: number): void {
    this.calculateOperation.emit(operationIndex);
  }

  /**
   * Triggers clear operation
   */
  onClear(operationIndex: number): void {
    this.clearOperation.emit(operationIndex);
    if (this.cutSection.operations[operationIndex]) {
      this.cutSection.operations[operationIndex] = {
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
      this.updateSection.emit(this.cutSection);
    }
  }

  /**
   * Adds a new operation
   */
  addOperation(): void {
    const newOperation: ToolOperation = {
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
    this.cutSection.operations.push(newOperation);
    this.updateSection.emit(this.cutSection);
  }

  /**
   * Removes an operation
   */
  removeOperation(index: number): void {
    if (this.cutSection.operations.length > 1) {
      this.cutSection.operations.splice(index, 1);
      this.updateSection.emit(this.cutSection);
    }
  }

  /**
   * Gets formatted cut number display
   */
  getCutNumberDisplay(): string {
    return this.cutSection.cutNumber || `Cut ${this.sectionIndex + 1}`;
  }

  /**
   * Gets parameter code for labels (e.g., "140b", "141b" for 2nd cut, "140c", "141c" for 3rd cut)
   * Offset: 0-9 for row 1 (140-149), 11-20 for row 2 (151-160)
   */
  getCutCode(offset: number = 0): string {
    const letter = String.fromCharCode(97 + this.sectionIndex + 1); // 'b' for 2nd cut, 'c' for 3rd cut
    let baseNumber = 140;
    
    if (offset >= 11) {
      baseNumber = 151 + (offset - 11);
    } else {
      baseNumber = 140 + offset;
    }
    
    return `${baseNumber}${letter}`;
  }

  /**
   * Tracks operations for ngFor optimization
   */
  trackByIndex(index: number): number {
    return index;
  }
}
