#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';


import { program } from '@commander-js/extra-typings';
import { LocalLambda } from './local-lambda/LocalLambda.js';


program
	.name('crater')
	.command('local-lambda')
	.argument('<directory>', 'directory path')
	.action((directoryPath) => {
		render(<LocalLambda
			directoryPath={directoryPath}
		/>)
	})


program.parse()
