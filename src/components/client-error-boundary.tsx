
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ClientErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error.message.includes('Rendered fewer hooks than expected')) {
      console.warn("Caught a predictable React hook error, likely due to real-time permission changes. Displaying fallback UI.");
    } else {
      // For other errors, you might want to log them differently
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  private handleReload = () => {
    window.history.back();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              <AlertDialogTitle className="text-center">Workspace Updated</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Changes have been made in this workspace that require a refresh to apply. Please reload the page to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogAction onClick={this.handleReload} className="w-full">
              Go Back
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    return this.props.children;
  }
}
