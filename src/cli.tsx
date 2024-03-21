#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';


import { Option, program } from '@commander-js/extra-typings';
import { RunLambda } from './docker/runLambda/RunLambda.js';
import { exec } from 'child_process';


program
	.name('crater')
	.command('docker')
	.command('runLambda')
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
	.command('kill')
	.addOption(new Option('-p, --port <container port>', 'container port'))
	.action(({
		port
	}) => {
		exec(`docker kill $(docker container ls | grep ':${port}' | awk '{print $1}')`)
	})

program.parse()
