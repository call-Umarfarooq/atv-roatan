"use client";

import { useEffect } from 'react';

export default function PrivacyProtector() {
  // useEffect(() => {
  //   // Disable right-click (Context Menu)
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   // Disable copying keyboard shortcuts and developer tools 
  //   const handleKeyDown = (e) => {
  //     // Allow default behavior for input fields and textareas
  //     if (
  //       e.target.tagName === 'INPUT' || 
  //       e.target.tagName === 'TEXTAREA' || 
  //       e.target.isContentEditable
  //     ) {
  //       return;
  //     }

  //     // Prevent developer tools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
  //     if (
  //       e.key === 'F12' ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
  //       (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
  //       (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
  //     ) {
  //       e.preventDefault();
  //     }

  //     // Prevent copy/cut shortcuts (Ctrl+C, Ctrl+X, Cmd+C, Cmd+X, Ctrl+A, Cmd+A)
  //     if (
  //       (e.ctrlKey || e.metaKey) && 
  //       (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'a' || e.key === 'A')
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   // Prevent drag and drop actions (like dragging images)
  //   const handleDragStart = (e) => {
  //     e.preventDefault();
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);
  //   document.addEventListener("dragstart", handleDragStart);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.removeEventListener("dragstart", handleDragStart);
  //   };
  // }, []);

  return null;
}
