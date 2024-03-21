#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';


import { Command, Option, program } from '@commander-js/extra-typings';
import { RunLambda } from './docker/runLambda/RunLambda.js';
import { exec } from 'child_process';
import packageJson from '../package.json';

program
	.name('crater')
	.command('docker')
	.version(packageJson.version)
	.addCommand(new Command('runLambda')
		.addOption(new Option('-p, --port <port>', 'port number')
			.makeOptionMandatory()
		)
		.addOption(new Option('-n, --image-name <image name>', 'docker image name'))
		.argument('<directoryPath>', 'directory path')
		.action((directoryPath, {
			port,
			imageName
		}) => {
			render(<RunLambda
				directoryPath={directoryPath}
				port={port}
				imageName={imageName}
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
