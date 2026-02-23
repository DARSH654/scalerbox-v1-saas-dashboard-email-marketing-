'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Domain {
    id: string;
    name: string;
    status: 'Verified' | 'Pending' | 'Failed';
    dkimStatus: 'Active' | 'Missing Record' | 'Invalid Key' | 'Pending';
    addedOn: string;
}

interface DomainContextType {
    domains: Domain[];
    addDomain: (name: string) => void;
    removeDomain: (id: string) => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children }: { children: React.ReactNode }) {
    const [domains, setDomains] = useState<Domain[]>([]);

    // Load from sessionStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem('email_domains');
        if (stored) {
            try {
                setDomains(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse domains', e);
            }
        }
    }, []);

    // Save to sessionStorage on change
    useEffect(() => {
        sessionStorage.setItem('email_domains', JSON.stringify(domains));
    }, [domains]);

    const addDomain = (name: string) => {
        const newDomain: Domain = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            status: 'Pending',
            dkimStatus: 'Pending',
            addedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setDomains(prev => [...prev, newDomain]);
    };

    const removeDomain = (id: string) => {
        setDomains(prev => prev.filter(d => d.id !== id));
    };

    return (
        <DomainContext.Provider value={{ domains, addDomain, removeDomain }}>
            {children}
        </DomainContext.Provider>
    );
}

export function useDomains() {
    const context = useContext(DomainContext);
    if (context === undefined) {
        throw new Error('useDomains must be used within a DomainProvider');
    }
    return context;
}
