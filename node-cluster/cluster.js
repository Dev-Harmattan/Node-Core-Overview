/***
 * Child Process: The child_process module provides the ability to spawn new processes and communicate with them using standard input/output streams. A child process runs independently of the parent process and can be used to execute external commands or other Node.js scripts. Child processes can be used to perform background tasks or to split a single process into multiple, more manageable parts.
 * Workers: Worker_threads module allows you to run JavaScript files or modules in a separate thread, using the SharedArrayBuffer and Atomics API to share memory between threads. A worker runs in the same process as the parent, but in a different thread, allowing to use multiple CPU cores.
 * Cluster: The cluster module allows you to create a cluster of worker processes that share the same port, allowing your application to take full advantage of multiple cores and improve performance. Each worker process runs in a separate process and can be used to handle different requests. The cluster module provides an easy way to create and manage worker processes, and it also provides a way to share the same state between the workers and the master.
 */

import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';

const numCpu = availableParallelism();

const handler = async () => {
  if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);
    for (let i = 0; i < numCpu; i++) {
      cluster.fork();
    }
  } else {
    const { server } = await import('./index.js');
  }
};

await handler();
