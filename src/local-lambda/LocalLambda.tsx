import { exec } from "child_process";
import { Text } from "ink";
import { FC, useEffect, useState } from "react";
import React from 'react';


export const LocalLambda: FC<{
    directoryPath: string;
}> = ({
    directoryPath
}) => {
        const [building, setBuilding] = useState(true);
        useEffect(() => {
            exec('docker build -t test-image .', (error, stdout, stderr) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                setBuilding(false);
            })
        }, [])
        return (<>
            {building && <Text>Building...</Text>}
        </>)
    }