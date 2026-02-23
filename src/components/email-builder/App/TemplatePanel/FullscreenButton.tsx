import React, { useCallback, useEffect, useState } from 'react';

import { IconButton, SvgIcon } from '@mui/material';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function CollapseIcon() {
    return (
        <SvgIcon fontSize="small">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z" />
            </svg>
        </SvgIcon>
    );
}

function ExpandIcon() {
    return (
        <SvgIcon fontSize="small">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
            </svg>
        </SvgIcon>
    );
}

export default function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <IconButton onClick={toggleFullscreen}>
                    {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
                </IconButton>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}</p>
            </TooltipContent>
        </Tooltip>
    );
}
