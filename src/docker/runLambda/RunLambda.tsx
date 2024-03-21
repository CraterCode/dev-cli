import { exec, spawn } from "child_process";
import { Text } from "ink";
import { FC, useEffect, useState } from "react";
import React from 'react';
import Spinner from 'ink-spinner';

export const RunLambda: FC<{
    directoryPath: string;
    port: string
    imageName?: string
}> = ({
    directoryPath,
    port,
    imageName
}) => {
        const [building, setBuilding] = useState(true);
        const [running, setRunning] = useState(false);
        const [imageId, setImageId] = useState<string | null>(null);
        useEffect(() => {
            exec(`docker build -q -t ${imageName ?? 'lambda-image'} ${directoryPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                setImageId(stdout);
                setBuilding(false);
            })
        }, [])
        useEffect(() => {
            if (imageId) {
                const process = spawn('docker', [
                    'run',
                    '--platform', 'linux/amd64',
                    '-p', `${port}:8080`,
                    '-d', imageId
                ])
                process.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                    setRunning(true);
                });
                // exec(`docker run --platform linux/amd64 -p ${port}:8080 -d ${imageId}`, (error, stdout, stderr) => {
                //     if (error) {
                //         console.error(`error: ${error.message}`);
                //         return;
                //     }
                //     if (stderr) {
                //         console.error(`stderr: ${stderr}`);
                //         return;
                //     }
                //     console.log(`stdout: ${stdout}`);
                //     setRunning(true);
                // })
            }
        }, [imageId])
        return (<>
            {building && <Text>
                <Text color='green'><Spinner type='dots' /> </Text>
                Building...
            </Text>}
        </>)
    }