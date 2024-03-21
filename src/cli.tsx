#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';


import { Command, Option, program } from '@commander-js/extra-typings';
import { RunLambda } from './docker/runLambda/RunLambda.js';
import { exec } from 'child_process';
import packageJson from '../package.json';

program
	.name('crater')
	.version((() => {
		const parts = packageJson.version.split('.').map(Number);
		return `${parts[0]}.${parts[1]}.${parts[2]! + 1}`;
	})())
	.command('docker')
	.addCommand(new Command('runLambda')
		.addOption(new Option('-p, --port <port>', 'port number')
			.makeOptionMandatory()
		)
		.addOption(new Option('-n, --image-name <image name>', 'docker image name'))
		.addOption(new Option('-e, --env-file <env-file>', '.env file'))
		.argument('<directoryPath>', 'directory path')
		.action((directoryPath, {
			port,
			imageName,
			envFile
		}) => {
			render(<RunLambda
				directoryPath={directoryPath}
				port={port}
				imageName={imageName}
				envFile={envFile}
			/>)
		})
	)
	.addCommand(new Command('kill')
		.addOption(new Option('-p, --port <container port>', 'container port'))
		.action(({
			port
		}) => {
			exec(`docker kill $(docker container ls | grep ':${port}' | awk '{print $1}')`)
		})
	)


program.parse()
