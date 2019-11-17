import * as childProcess from 'child_process';

let runningDevServer = false;

export default {
	writeBundle() {
		if (!runningDevServer) {
			runningDevServer = true;
			childProcess.spawn('npm', ['run', 'start:dev'], { stdio: ['ignore', 'inherit', 'inherit'], shell: true });
		}
	},
};
