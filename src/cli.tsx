#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';


import { Option, program } from '@commander-js/extra-typings';
import { LocalLambda } from './local-lambda/LocalLambda.js';


program
	.name('crater')
	.command('local-lambda')
	.addOption(new Option('-d, --directory-path <directory>', 'directory path')
		.makeOptionMandatory()
	)
	.addOption(new Option('-p, --port <port>', 'port number')
		.makeOptionMandatory()
	)
	.addOption(new Option('-n, --image-name <image name>', 'docker image name'))
	.action(({
		directoryPath,
		port,
		imageName
	}) => {
		render(<LocalLambda
			directoryPath={directoryPath}
			port={port}
			imageName={imageName}
		/>)
	})


program.parse()
