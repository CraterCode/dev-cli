#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './app.js';


import { program } from '@commander-js/extra-typings';
import { LocalLambda } from './local-lambda/LocalLambda.js';


program
	.name('crater')
	.command('local-lambda')
	.argument('<string>', 'directory path')
	.action((directoryPath) => {
		render(<LocalLambda
			directoryPath={directoryPath}
		/>)
	})


program.parse()
