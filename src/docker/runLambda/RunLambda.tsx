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
                setImageId(stdout.replaceAll('sha256:', ''));
                setBuilding(false);
            })
        }, [])
        useEffect(() => {
            if (imageId) {
                console.log(imageId)
                const dockerProcess = spawn('docker', [
                    'run',
                    '--platform', 'linux/amd64',
                    '-p', `${port}:8080`,
                    '-d', `${imageId}`
                ])
                console.log('Docker process started')
                dockerProcess.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                    // Set running to true or do something else
                });

                dockerProcess.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                dockerProcess.on('exit', (code, signal) => {
                    console.log(`Docker process exited with code ${code} and signal ${signal}`);
                    // Set running to false or do some cleanup
                });

                dockerProcess.on('error', (err) => {
                    console.error('Failed to start Docker process:', err);
                });
                process.stdin.resume()
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