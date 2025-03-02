import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useRef, useEffect } from 'react';
import '@xterm/xterm/css/xterm.css';

const TerminalComponent = () => {
    const terminalRef = useRef(null); // Ref for the terminal container
    const isRendered = useRef(false); // Track if the terminal has been rendered
    const term = useRef(null); // Ref to store the terminal instance
    const fitAddon = useRef(new FitAddon()); // Ref for the FitAddon instance

    useEffect(() => {
        // Avoid re-rendering the terminal
        if (isRendered.current) return;

        // Initialize the terminal
        term.current = new Terminal({
            cursorBlink: true, // Enable blinking cursor
            theme: {
                background: '#1e1e1e', // Dark background
                foreground: '#ffffff', // White text
            },
            fontSize: 14, // Set font size
            fontFamily: 'monospace', // Use monospace font
        });

        // Load the FitAddon to handle terminal resizing
        term.current.loadAddon(fitAddon.current);

        // Open the terminal in the DOM element
        term.current.open(terminalRef.current);

        // Fit the terminal to its container
        fitAddon.current.fit();

        // Handle terminal input
        term.current.onData((data) => {
            console.log('Terminal input:', data);
            // You can handle input here (e.g., send to a backend or process locally)
        });

        // Handle window resize events
        const handleResize = () => {
            fitAddon.current.fit();
        };
        window.addEventListener('resize', handleResize);

        // Mark the terminal as rendered
        isRendered.current = true;

        // Cleanup function to dispose of the terminal instance and remove event listeners
        return () => {
            term.current.dispose(); // Dispose of the terminal
            window.removeEventListener('resize', handleResize); // Remove resize listener
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div
            id="terminal"
            ref={terminalRef}
            style={{ width: '100%', height: '100%' }} // Ensure the container fills its parent
        />
    );
};

export default TerminalComponent;